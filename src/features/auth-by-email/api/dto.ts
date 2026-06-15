export interface AuthResponse {
    data: {
        user: UserDTO;
        refreshToken: string;
        accessToken: string;
    },
    ok: boolean;
}

export interface AuthErrorResponse {
    ok: boolean;
    error: "unauthorized" | "error";
    status?: number | undefined;
}

export type UserDTO = {
    "id": string
    "email": string
    "firstName": string
    "lastName": string
    "nickname": string
    "phone": string
    "avatarUrl": string
}

export interface RegisterDTO {
    email: string;
    password: string;
    phone?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}