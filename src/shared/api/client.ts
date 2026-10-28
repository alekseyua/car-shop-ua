import { BACKEND_HOST } from "@/src/config";
import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";
import { getRefreshToken } from "../auth/refreshManager";

type FetchOptions = RequestInit & {
  skipAuth?: boolean;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: "unauthorized" | "error" | string; status?: number };

export async function api<T>(
  endpoint: string,
  options: FetchOptions = {},
  _retry = false,
): Promise<ApiResult<T>> {
  const token =
    typeof window !== "undefined" ? useAuthStore.getState()?.accessToken : null;

  let response: Response;

  try {
    response = await fetch(`${BACKEND_HOST}/api${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(!options.skipAuth && token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    console.error("[API] Network/CORS error:", error);

    return {
      ok: false,
      error: "Network or CORS error",
    };
  }

  const text = await response.text();

  let data: any = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (response.status === 401 && !options.skipAuth) {
    if (_retry) {
      return { ok: false, error: "unauthorized", status: 401 };
    }

    const newToken = await getRefreshToken();

    if (!newToken) {
      return { ok: false, error: "unauthorized", status: 401 };
    }

    return api<T>(endpoint, options, true);
  }

  if (!response.ok) {
    return {
      ok: false,
      error: data?.message ?? "error",
      status: response.status,
    };
  }

  return { ok: true, data };
}
