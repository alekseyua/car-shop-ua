import { BACKEND_HOST } from "@/src/config";

export async function getRefreshTokenApi(
//   refreshT: string | null,
): Promise<string | null> {
  try {
    const response = await fetch(BACKEND_HOST + "/api/auth/refresh", {
      method: "POST",
      credentials: "include", // 👈 важно (cookie refresh token)
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null;
    }

    const data: { accessToken: string } = await response.json();
    return data.accessToken;
  } catch {
    return null;
  }
}
