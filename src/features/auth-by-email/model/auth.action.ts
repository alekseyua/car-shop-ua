import { useAuthStore } from "./auth.store"

export const getDataUser = () => {
    useAuthStore.getState().getMeAuth();
}