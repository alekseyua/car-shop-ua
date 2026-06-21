import { create } from "zustand";
import { CartItem, CartStore, ProductDto } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";
import { addCartItem, updateQuantityItemCart } from "../api/cart.api";

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
                                ? { ...cartItem, 
                                    title: item.description,
                                    imageUrl: item.firstPic,
                                    quantity: cartItem.quantity + 1 }
                                : cartItem
                        ),
                    });
                } else {
                    // If the item doesn't exist in the cart, add it with quantity 1
                    set({ cartItems: [...get().cartItems, { ...item, 
                        title: item.description,
                        imageUrl: item.firstPic,
                        quantity: 1 }] });
                }
                await addCartItem({
                    itemNo: item.itemNo,
                    quantity: 1,
                });
            },
            removeFromCart: (itemNo: string) => {
                set({ cartItems: get().cartItems.filter((item: CartItem) => item.itemNo !== itemNo) });
                
            },
            clearCart: () => {
                set({ cartItems: [] });
            },
            changeQuantity: (itemNo: string, count: number) => {
                set({
                    cartItems: get().cartItems.map((item: CartItem) => 
                        item.itemNo === itemNo  
                            ?{...item, quantity: count}
                            : item
                    )
                });
                updateQuantityItemCart(itemNo, count); 
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
                            itemNo: localItem.itemNo,
                            quantity: localItem.quantity,
                        });

                    } else {
                        // если товара нет
                        await addCartItem({
                            itemNo: localItem.itemNo,
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
