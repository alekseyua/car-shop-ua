// ./src/features / auth - by - email /
// ├── model
// │   ├── store.ts
import { create } from "zustand";
import { AuthState } from "./auth.types";
import { getMe } from "../api/auth.api";
import { useCartStore } from "@/src/entities/cart/model/cart.store";

export const useAuthStore = create<AuthState>()(
  (set, get) => ({
    user: null,
    accessToken: null,
    isAuthInitialized: false,
    setAuthInitialized: (value) => set({ isAuthInitialized: value }),
    getMeAuth: async () => {
    try {
        const response = await getMe();
        if (!response.ok) {
          set({
            user: null,
            accessToken: null,
          });
          return;
        }
        useCartStore.getState().loadServerCart();
        set({
          user: response.data,
        });
    } catch (error) {
        console.error("[AUTH] getMeAuth error:", error);

        set({
          user: null,
          accessToken: null,
        });
    } finally {
        useAuthStore.getState().setAuthInitialized(true);
    }
    },
    setAuth: (user, accessToken) => set({ user, accessToken }),

    setUser: (user) => {
      console.log("setUser");
      set({ user });
    },

    setToken: (accessToken) => set({ accessToken }),
    logout: () => {
      set({ user: null, accessToken: null, isAuthInitialized: false });
    },
  }),
);