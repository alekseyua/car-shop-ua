import { create } from "zustand";
import { CartItem, CartStore, ProductDto } from "./types";

export const useCartStore = create<CartStore>((set, get) => ({
    
    cartItems: [],
    addToCart: (item: ProductDto) => {
        const existingItem = get().cartItems.find((cartItem: CartItem) => cartItem.itemNo === item.itemNo);
        if (existingItem) {
            // If the item already exists in the cart, increase its quantity
            set({
                cartItems: get().cartItems.map((cartItem: CartItem) =>
                    cartItem.itemNo === item.itemNo
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                ),
            });
        } else {
            // If the item doesn't exist in the cart, add it with quantity 1
            set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
        }
    },
    removeFromCart: (itemNo: string) => {
        set({ cartItems: get().cartItems.filter((item: CartItem) => item.itemNo !== itemNo) });
    },
    clearCart: () => {
        set({ cartItems: [] });
    },
}

)
);
