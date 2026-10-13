import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";
import { getRefreshToken } from "../api/refresh";

export async function handleRefresh(): Promise<string | null> {
    const token = await getRefreshToken();
    if (!token) return null;

    useAuthStore.getState().setToken(token);

    return token;
}