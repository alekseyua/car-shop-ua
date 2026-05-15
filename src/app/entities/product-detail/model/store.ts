import { create } from "zustand";

interface ProductDetailState {
    product: any;
    getProduct: (id: string) => void;
    setProduct: () => void;

}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
    product: null,
    getProduct: (id: string) => {
        console.log(`Fetching product details for ID: ${id}`);
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