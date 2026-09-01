import { api } from "@/src/shared/api/client";
import { create } from "zustand";
import { ProductDetailResponse } from "./detail.types";

interface ProductDetailState {
  product: ProductDetailResponse | null;
  isLoading: boolean;
  error: string | null; 
  getProduct: (id: string) => void;
}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
  product: null,
  isLoading: false,
  error: null,

  getProduct: async (id: string): Promise<void> => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await api(`/product/${id}`);

      if (!response.ok) {
        throw new Error(response.error || "Не удалось загрузить товар");
      }

      if (!response.data) {
        throw new Error("Товар не найден");
      }

      set({
        product: response.data as ProductDetailResponse,
      });
    } catch (error) {
      console.error("Product detail error:", error);

      set({
        product: null,
        error:
          error instanceof Error
            ? error.message
            : "Произошла неизвестная ошибка",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));