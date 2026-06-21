import { HOST } from "@/src/config";

export async function refreshToken(refreshT: string | null): Promise<string | null> {
    try {
        if(!refreshT) return null;
        const res = await fetch(HOST + "/auth/refresh", {
            method: "POST",
            credentials: "include", // 👈 важно (cookie refresh token)
            body: JSON.stringify({
                refreshToken: refreshT
            })
        });

        if (!res.ok) return null;

        const data = await res.json();

        return data.accessToken;
    } catch {
        return null;
    }
}
