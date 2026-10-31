import { api } from "@/src/shared/api/client";
import type { UserDTO } from "./auth.dto";
import { useAuthStore } from "../model/auth.store";
import { syncCartAfterLogin } from "../../cart/model/action-sync-cart";
import { getRefreshToken } from "@/src/shared/auth/refreshManager";

export async function completeGoogleLogin() {
  const accessToken = await getRefreshToken();

  if (!accessToken) {
    throw new Error("Не удалось завершить вход через Google");
  }

  const result = await api<UserDTO>("/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    skipAuth: true,
  });

  if (!result.ok) {
    throw new Error(result.error ?? "Не удалось получить данные пользователя");
  }

  const user = result.data;

  useAuthStore.getState().setAuth(user, accessToken);

  await syncCartAfterLogin();

  return { user, accessToken };
}
