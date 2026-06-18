import { create } from "zustand";
import { CartItem, CartStore, ProductDto } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";
import { addCartItem } from "../api/cart.api";

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({

            cartItems: [],
            addToCart: async (item: ProductDto) => {
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
                await addCartItem({
                    productId: item.itemNo,
                    quantity: 1,
                });
            },
            removeFromCart: (itemNo: string) => {
                set({ cartItems: get().cartItems.filter((item: CartItem) => item.itemNo !== itemNo) });
            },
            clearCart: () => {
                set({ cartItems: [] });
            },
            increaseQuantity: (itemNo: string) => {
                set({
                    cartItems: get().cartItems.map((item) =>
                        item.itemNo === itemNo
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                });
            },

            decreaseQuantity: (itemNo: string) => {
                set({
                    cartItems: get().cartItems
                        .map((item) =>
                            item.itemNo === itemNo
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                });
            },
            syncWithServer: async (serverItems: CartItem[]) => {
                const localItems = get().cartItems;


                for (const localItem of localItems) {

                    const exist = serverItems.find(
                        item => item.itemNo === localItem.itemNo
                    );


                    if (exist) {
                        // если товар уже есть
                        // можно увеличить количество
                        await addCartItem({
                            productId: localItem.itemNo,
                            quantity: localItem.quantity,
                        });

                    } else {
                        // если товара нет
                        await addCartItem({
                            productId: localItem.itemNo,
                            quantity: localItem.quantity,
                        });
                    }
                }


                set({
                    cartItems: [
                        ...serverItems,
                        ...localItems.filter(
                            local =>
                                !serverItems.some(
                                    server => server.itemNo === local.itemNo
                                )
                        ),
                    ],
                });
            },
        }),
        {
            name: "cart-storage", // ключ в localStorage
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                cartItems: state.cartItems,
            }),
        }
    )
);
