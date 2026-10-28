import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";
import { getRefreshTokenApi } from "../api/refresh";

export async function handleRefresh(): Promise<string | null> {
    const token = await getRefreshTokenApi();
    if (!token) return null;

    useAuthStore.getState().setToken(token);

    return token;
}