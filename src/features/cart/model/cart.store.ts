import { create } from "zustand";
import { CartItem, CartStore } from "./cart.types";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addCartItem,
  updateQuantityItemCart,
  deleteItemFromCart,
} from "../api/cart.api";
import {
  ResponseCatalogItem,
  ResponseTopProduct,
} from "@/src/entities/catalog/api/dto";
import { ProductAccessories } from "@/src/entities/catalogAccessories/model/accessories.type";
import { ProductItemDetail } from "@/src/entities/product-detail/model/detail.types";
import useModal from "@/src/hooks/use-modal";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      total: 0,
      addToCart: async (
        item:
          | ResponseCatalogItem
          | ResponseTopProduct
          | ProductAccessories
          | ProductItemDetail,
        statusDelivery: string,
      ) => {
        const existingItem = get().cartItems.find(
          (cartItem: CartItem) => cartItem.itemNo === item.itemNo,
        );
        if (existingItem) {
          // If the item already exists in the cart, increase its quantity
          set({
            cartItems: get().cartItems.map((cartItem: CartItem) =>
              cartItem.itemNo === item.itemNo
                ? {
                    ...cartItem,
                    title: item.description,
                    imageUrl: item.firstPic,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem,
            ),
          });
        } else {
          // If the item doesn't exist in the cart, add it with quantity 1
          set({
            cartItems: [
              ...get().cartItems,
              {
                ...item,
                title: item.description,
                imageUrl: item.firstPic,
                quantity: 1,
                statusDelivery,
              },
            ],
          });
          // open modal window cart
          useModal.getState().openModal({
            type: 'cart'
          })
        }
        await addCartItem({
          itemNo: item.itemNo,
          quantity: 1,
          statusDelivery,
        });
      },
      removeFromCart: async (itemNo: string) => {
        set({
          cartItems: get().cartItems.filter(
            (item: CartItem) => item.itemNo !== itemNo,
          ),
        });
        await deleteItemFromCart(itemNo);
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
      changeQuantity: (itemNo: string, count: number) => {
        set({
          cartItems: get().cartItems.map((item: CartItem) =>
            item.itemNo === itemNo ? { ...item, quantity: count } : item,
          ),
        });
        updateQuantityItemCart(itemNo, count);
      },

      syncWithServer: async (serverItems: CartItem[], total) => {
        const localItems = get().cartItems;

        console.log({ localItems });
        // Добавляем локальные товары на сервер
        for (const localItem of localItems) {
          const exist = serverItems?.some(
            (item) => item.itemNo === localItem.itemNo,
          );
          if (!exist) {
            await addCartItem({
              itemNo: localItem.itemNo,
              quantity: localItem.quantity,
              statusDelivery: localItem.statusDelivery,
            });
          }
        }

        set({
          cartItems: serverItems,
          total: total,
        });
      },
    }),
    {
      name: "cart-storage", // ключ в localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartItems: state.cartItems,
      }),
    },
  ),
);
