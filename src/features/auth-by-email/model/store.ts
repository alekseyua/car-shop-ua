// ./src/features / auth - by - email /
// ├── model
// │   ├── store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,

            setAuth: (user, accessToken) =>
                set({ user, accessToken }),

            setUser: (user) =>
                set({ user }),

            setToken: (accessToken) =>
                set({ accessToken }),

            logout: () => {
                set({ user: null, accessToken: null });

                localStorage.removeItem("auth-storage");
            },
        }),
        {
            name: "auth-storage", // ключ в localStorage

            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
            }),
        }
    )
);