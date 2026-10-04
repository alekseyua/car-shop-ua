import { create } from "zustand";

interface useFavoriteStore {
    countFavorite: number;
}
export const useFavoriteStore = create<useFavoriteStore>((set) => ({
    countFavorite: 0,
    
}));