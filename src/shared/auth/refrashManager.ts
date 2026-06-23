// src/shared/auth/refreshManager.ts
import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { handleRefresh } from "./handleRefresh";
import { handleLogout } from "@/src/processes/logout/model/logout";

let refreshPromise: Promise<string | null> | null = null;

export function getRefreshToken(): Promise<string | null> | null {
    const refreshToken = useAuthStore.getState().refreshToken;
    console.log({refreshToken})
    if(!refreshToken) {
        handleLogout();
        return null; 
    }
    if (!refreshPromise) {
        console.log('start refreshPromise = ', refreshPromise)
        refreshPromise = handleRefresh(refreshToken).finally(() => {
            refreshPromise = null;
        });
        console.log('finish refreshPromise = ', refreshPromise)
    }

    return refreshPromise;
}