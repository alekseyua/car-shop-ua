export interface AuthResponse {
    user: UserDTO;
    refreshToken: string;
    accessToken: string;
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