import { api } from "@/src/shared/api/client";
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
        const response = await api(`/product/${id}`);
        if(!response.ok){
          throw response.error;
        }
        const {data} = response;
        console.log("API response:", data);
      set({ product: data as ProductDetailResponse, isLoading: false });
    } catch (error) {
        console.error("Error fetching product details:", error);
        set({ isLoading: false });
    }
  },

}));