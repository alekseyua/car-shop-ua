import { handleRefresh } from "./handleRefresh";

let refreshPromise: Promise<string | null> | null = null;

export function getRefreshToken(): Promise<string | null> | null {
    if (!refreshPromise) {
        console.log('start refreshPromise = ', refreshPromise)
        refreshPromise = handleRefresh().finally(() => {
            refreshPromise = null;
        });
        console.log('finish refreshPromise = ', refreshPromise)
    }

    return refreshPromise;
}