import { api } from "@/src/shared/api/client";
import type { UserDTO } from "./auth.dto";
import { useAuthStore } from "../model/auth.store";
import { syncCartAfterLogin } from "../../cart/model/action-sync-cart";
import { getRefreshTokenApi } from "@/src/shared/api/refresh";

export async function completeGoogleLogin() {
  // 1. Получаем accessToken через существующий API.
  const accessToken = await getRefreshTokenApi();

  if (!accessToken) {
    throw new Error("Не удалось завершить вход через Google");
  }

  // 2. Получаем пользователя.
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

  // 3. Сохраняем авторизацию в существующий store.
  useAuthStore.getState().setAuth(user, accessToken);

  // 4. Синхронизируем корзину.
  await syncCartAfterLogin();

  return { user, accessToken };
}
