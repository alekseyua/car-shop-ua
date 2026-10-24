import { BACKEND_HOST } from "@/src/config";

export async function getRefreshToken(
//   refreshT: string | null,
): Promise<string | null> {
  try {
    // if (!refreshT) return null;
    const response = await fetch(BACKEND_HOST + "/auth/refresh", {
      method: "POST",
      credentials: "include", // 👈 важно (cookie refresh token)
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     refreshToken: refreshT,
      //   }),
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
