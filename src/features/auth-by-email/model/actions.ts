import { useAuthStore } from "./store"

export const handleLoguot = () => useAuthStore.getState().logout();