// ./src/features / auth - by - email /
// ├── api
// │   ├── api.ts
import { api, ApiResult } from "@/src/shared/api/client";
import { useAuthStore } from "../model/auth.store";
import { AuthResponse, LoginDTO, RegisterDTO, UserDTO } from "./auth.dto";
import { syncCartAfterLogin } from "../../cart/model/action-sync-cart";

export const registerUserByEmail = async (dto: RegisterDTO) => {
    try {
        const result= await api<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(dto),
            skipAuth: true,
        });
        if (!result.ok) {
            // result.error доступен здесь
            throw new Error(result.error);
        }

        const { data } = result;
        useAuthStore.getState().setAuth(
            data.user,
            data.accessToken,
        );
        
        await syncCartAfterLogin();
        return data;
    } catch (error) {
        throw error;
    }

};

export const loginUserbyEmail = async (dto: LoginDTO) => {
    try {
        const result = await api<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(dto),
            skipAuth: true,
        });

        if (!result.ok) {
            // result.error доступен здесь
            throw new Error(result.error);
        }

        const { data } = result;
        
        // console.log("loginUserbyEmail data:", data);
        
        useAuthStore.getState().setAuth(data.user as UserDTO, data.accessToken);
        await syncCartAfterLogin();
    }
    catch (error) {
        console.log("Error in loginUserbyEmail:", error);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        await api("/auth/logout", {
            method: "POST",
        });
    } catch (error) {
        throw error;
    }
}

export const getMe = async () => {
    const res = await api<UserDTO>("/users/me", {
        method: "GET",
    });
    // useAuthStore.getState().setUser(res);
    console.log({userMe: res})
    if(!res.ok && res.status === 401){
        getMeSession();
    }
    return res;
};

export const getMeSession = async () => {
    const res = await api<UserDTO>("/guest-session", {
      method: "POST",
    });
    // useAuthStore.getState().setUser(res);
    return res;

}

export const loginRegistrationByGoogle = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
}

export async function startGoogleLink(accessToken: string) {
  const response = await api(`/auth/google/link`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.error ?? "Failed to start Google linking");
  }

  return response.data as { url: string };
}
