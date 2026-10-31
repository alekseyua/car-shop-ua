// import { BACKEND_HOST } from "@/src/config";

// export async function getRefreshTokenApi(
// //   refreshT: string | null,
// ): Promise<string | null> {
//   try {
//     const response = await fetch(BACKEND_HOST + "/api/auth/refresh", {
//       method: "POST",
//       credentials: "include", // 👈 важно (cookie refresh token)
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       return null;
//     }

//     const data: { accessToken: string } = await response.json();
//     return data.accessToken;
//   } catch {
//     return null;
//   }
// }


import { BACKEND_HOST } from "@/src/config";
import { delaySleep } from "../libs/helpers";


export async function getRefreshTokenApi(
  retries = 5,
  delay = 1000,
): Promise<string | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${BACKEND_HOST}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data: { accessToken?: string } = await response.json();

        if (data.accessToken) {
          return data.accessToken;
        }
      }

      // Повторяем только при потенциально временной ошибке.
      if (response.status !== 401 && response.status !== 403) {
        if (attempt < retries - 1) {
          await delaySleep(delay);
          continue;
        }
      }

      return null;
    } catch {
      if (attempt === retries - 1) {
        return null;
      }
    }

    await delaySleep(delay);
  }

  return null;
}
