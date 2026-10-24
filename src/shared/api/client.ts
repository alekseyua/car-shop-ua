// ./src/shared / api /
// ├── client.ts
// src/shared/api/client.ts
import { BACKEND_HOST } from "@/src/config";
import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";
import { getRefreshToken } from "../auth/refrashManager";

type FetchOptions = RequestInit & {
    skipAuth?: boolean;
};

export type ApiResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: "unauthorized" | "error" | string; status?: number };
    
    export async function api<T>(
        endpoint: string,
        options: FetchOptions = {},
        _retry = false
    ): Promise<ApiResult<T>> {
        const token =
        typeof window !== "undefined"
        ? useAuthStore.getState().accessToken
        : null;
        
        console.log(
          endpoint, " .accessToken = ",
          useAuthStore.getState().accessToken,
        );
    const response = await fetch(BACKEND_HOST + endpoint, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.skipAuth ? {} : token ? {
                Authorization: `Bearer ${token}`,
            } : {}),
            ...(options.headers || {}),
        },
    });
   const text = await response.text();

   let data: any = null;

   if (text) {
     try {
       data = JSON.parse(text);
     } catch {
       data = text;
     }
   }

    // =========================
    // 401 HANDLING
    // =========================
    if (response.status === 401 && !options.skipAuth) {
        if (_retry) {
            return {
                ok: false,
                error: "unauthorized",
                status: 401,
            };
        }

        const newToken = await getRefreshToken();

        if (!newToken) {
            return {
                ok: false,
                error: "unauthorized",
                status: 401,
            };
        }
        
        // retry ONCE
        return api<T>(endpoint, options, true);
    }
    
    // =========================
    // ERROR HANDLING
    // =========================
    if (!response.ok) {
        return {
            ok: false,
            error: data?.message ?? 'error',
            status: response.status,
        };
    }


    return { ok: true, data };
}