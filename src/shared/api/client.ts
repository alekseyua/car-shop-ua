// ./src/shared / api /
// ├── client.ts
// src/shared/api/client.ts
import { HOST } from "@/src/config";
import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { getRefreshToken } from "../auth/refrashManager";

type FetchOptions = RequestInit & {
    skipAuth?: boolean;
};

export type ApiResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: "unauthorized" | "error"; status?: number };

export async function api<T>(
    endpoint: string,
    options: FetchOptions = {},
    _retry = false
): Promise<ApiResult<T>> {
    const token =
        typeof window !== "undefined"
            ? useAuthStore.getState().accessToken
            : null;

    const response = await fetch(HOST + endpoint, {
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
            error: "error",
            status: response.status,
        };
    }

    const data = await response.json();

    return { ok: true, data };
}