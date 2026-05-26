import { api } from "@/src/app/shared/api/client";
import { create } from "zustand";
import { ProductDetailResponse } from "./types";

interface ProductDetailState {
  product: ProductDetailResponse | null;
  isLoading: boolean;
  getProduct: (id: string) => void;
}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
  product: null,
  isLoading: false,
  getProduct: async (id: string): Promise<void> => {
    console.log(`Fetching product details for ID: ${id}`);
    set({ isLoading: true });
    try{
        const response: ProductDetailResponse = await api(`/product/${id}`);
        console.log("API response:", response);
        set({ product: response, isLoading: false });
    } catch (error) {
        console.error("Error fetching product details:", error);
        set({ isLoading: false });
    }
  },

}));