// src/shared/auth/refreshManager.ts
import { handleRefresh } from "./handleRefresh";

let refreshPromise: Promise<string | null> | null = null;

export function getRefreshToken(): Promise<string | null> {
    if (!refreshPromise) {
        refreshPromise = handleRefresh().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}