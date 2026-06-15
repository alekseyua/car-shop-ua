// ./src/features / auth - by - email /
// ├── api
// │   ├── api.ts
import { api } from "@/src/shared/api/client";
import { useAuthStore } from "../model/store";
import { AuthErrorResponse, AuthResponse, LoginDTO, RegisterDTO, UserDTO } from "./dto";

export const registerUserByEmail = async (dto: RegisterDTO) => {
    try {
        const {data, ok} = await api<AuthResponse | AuthErrorResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(dto),
            skipAuth: true,
        });

        useAuthStore.getState().setAuth(
            data.user,
            data.accessToken
        );

        return data;
    } catch (error) {
        throw error;
    }

};

export const loginUserbyEmail = async (dto: LoginDTO) => {
    try {
        const data = await api<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(dto),
            skipAuth: true,
        });

        console.log("loginUserbyEmail data:", data);

        useAuthStore.getState().setAuth(data.user as UserDTO, data.accessToken);
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
            skipAuth: true,
            credentials: "include", // 👈 важно (cookie refresh token)
        });
        useAuthStore.getState().logout();
    } catch (error) {
        throw error;
    }
}

export const getMe = async () => {
    const res = await api<UserDTO>("/users/me", {
        method: "GET",
    });
    // useAuthStore.getState().setUser(res);
    return res;
};