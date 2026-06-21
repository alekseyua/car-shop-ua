// ./src/features / auth - by - email /
// ├── model
// │   ├── store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "./types";
import { useCartStore } from "../../cart/model/store";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,

            setAuth: (user, accessToken, refreshToken) =>
                set({ user, accessToken, refreshToken }),

            setUser: (user) =>
                set({ user }),

            setToken: (accessToken) =>
                set({ accessToken }),

            setRefreshToken: (refreshToken) =>
                    set({refreshToken}),

            logout: () => {
                set({ user: null, accessToken: null, refreshToken: null });
                // useCartStore.setState({
                //     cartItems: []
                // })
                // localStorage.removeItem("auth-storage");
            },
        }),
        {
            name: "auth-storage", // ключ в localStorage

            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
            }),
        }
    )
);