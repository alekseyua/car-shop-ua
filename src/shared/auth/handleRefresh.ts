import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { refreshToken } from "../api/refresh";

export async function handleRefresh(): Promise<string | null> {
    const token = await refreshToken();

    if (!token) return null;

    useAuthStore.getState().setToken(token);

    return token;
}