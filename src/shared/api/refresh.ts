import { HOST } from "@/src/config";

export async function refreshToken(): Promise<string | null> {
    try {
        const res = await fetch(HOST + "/auth/refresh", {
            method: "POST",
            credentials: "include", // 👈 важно (cookie refresh token)
        });

        if (!res.ok) return null;

        const data = await res.json();

        return data.accessToken;
    } catch {
        return null;
    }
}
