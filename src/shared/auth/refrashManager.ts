// src/shared/auth/refreshManager.ts
import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { handleRefresh } from "./handleRefresh";

let refreshPromise: Promise<string | null> | null = null;

export function getRefreshToken(): Promise<string | null> {
    const refreshToken = useAuthStore.getState().refreshToken;
    if(!refreshToken) {
        useAuthStore.getState().logout();
    }
    if (!refreshPromise) {
        refreshPromise = handleRefresh(refreshToken).finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}