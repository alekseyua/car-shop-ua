// ./src/shared / api /
// ├── client.ts

import { HOST } from "@/src/config";
import { useAuthStore } from "@/src/features/auth-by-email/model/store";

type FetchOptions = RequestInit & {
    next?: NextFetchRequestConfig;
    skipAuth?: boolean;
};

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

export async function api<T>(
    endpoint: string,
    options: FetchOptions = {}
) :Promise<T> {
    try {
        const token =
            typeof window !== "undefined"
                ? useAuthStore.getState().accessToken
                : null;
        const response = await fetch(HOST + endpoint,{
            ...options,
            credentials: "include",
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                ...(options.skipAuth ? {} : token ? {
                Authorization: `Bearer ${token}`,
                } : {}),
                ...(options.headers || {}),
            },
        })
        if (response.status === 401 && !options.skipAuth) {
            if(isRefreshing){
                return new Promise((resolve, reject) => {
                    queue.push((token) => {
                        if (!token) return reject(new Error("Unauthorized"));

                        const newOptions = {
                            ...options,
                            headers: {
                                ...options.headers,
                                Authorization: `Bearer ${token}`,
                            },
                        };

                        api<T>(endpoint, newOptions).then(resolve).catch(reject);
                    });
                });
            }
            isRefreshing = true;
            const token = await refreshToken();
            isRefreshing = false;
            queue.forEach(cb => cb(token));
            queue = [];
            if(token){
                return api<T>(endpoint, options);
            }
            useAuthStore.getState().logout();
            throw new Error("Unauthorized");
        }

        if(!response.ok){
            throw await response.json().then((error) => {
                throw error;
            });
        }
        return await response.json()
    } catch (error) {
        throw error;
    }
}

async function refreshToken(): Promise<string | null> {
    try {
        const res = await fetch(HOST + "/auth/refresh", {
            method: "POST",
            credentials: "include", // 👈 важно (cookie refresh token)
        });

        if (!res.ok) return null;

        const data = await res.json();

        useAuthStore.getState().setToken(data.accessToken);

        return data.accessToken;
    } catch {
        return null;
    }
}
