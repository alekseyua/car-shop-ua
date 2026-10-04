export type User = {
    id: string;
    email: string;
    phone?: string;
};

export type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;

    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    setUser: (user: User | null) => void;
    setToken: (token: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    logout: () => void;
};
