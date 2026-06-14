export type User = {
    id: string;
    email: string;
    phone?: string;
};

export type AuthState = {
    user: User | null;
    accessToken: string | null;

    setAuth: (user: User, accessToken: string) => void;
    setUser: (user: User | null) => void;
    setToken: (token: string) => void;
    logout: () => void;
};
