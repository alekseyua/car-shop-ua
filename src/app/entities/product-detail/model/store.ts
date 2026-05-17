import { api } from "@/src/app/shared/api/client";
import { create } from "zustand";

interface ProductDetailState {
    product: any;
    getProduct: (id: string) => void;
    setProduct: () => void;

}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
    product: null,
    getProduct: async (id: string) => {
        console.log(`Fetching product details for ID: ${id}`);  
        const response = await api(`/items-catalog/${id}`);
        console.log('API response:', response);
        // Fetch product details from API and update state
        // Example:
        // fetch(`/api/products/${id}`)
        //     .then(response => response.json())
        //     .then(data => set({ product: data }));
    },
    setProduct: () => {
        // This function can be used to manually set the product details if needed
    },

}))