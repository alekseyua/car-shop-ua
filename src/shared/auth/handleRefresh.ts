import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { refreshToken } from "../api/refresh";
import { handleLogout } from "@/src/processes/logout/model/logout";

export async function handleRefresh(refreshT: string | null): Promise<string | null> {
    const token = await refreshToken(refreshT);
    console.log({ token })
    if (token === 'logout'){
        handleLogout();
        return null;
    }
    if (!token) return null;

    useAuthStore.getState().setToken(token);

    return token;
}