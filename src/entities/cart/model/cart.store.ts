"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

import { cartApi } from "../api/cart.api";

import type { CartItem, CartResponse } from "./types";
import {
  addQuantityOptimistically,
  removeFromCartOptimistically,
  updateQuantityOptimistically,
} from "./actions.cart";

interface CartStore {
  cartItems: CartItem[];
  guestItems: CartItem[];
  total: number;

  isLoading: boolean;
  isSyncing: boolean;
  isInitialized: boolean;
  error: string | null;

  initializeGuestCart: () => void;
  loadServerCart: () => Promise<void>;
  updateQuantityItemCart: (item: CartItem, count: number) => void;
  updateGuestQuantity: (item: CartItem, count: number) => Promise<void>;
  removeFromCart: (itemNo: string) => Promise<void>;
  removeGuestFromCart: (itemNo: string) => void;
  clearCart: () => void;
  addGuestItem: (item: CartItem) => void;
  addItemToCart: (item: CartItem) => Promise<void>;
  clearGuestItems: () => void;
  syncWithServer: () => Promise<void>;
  calculateGuestCart: ()=>void;
}

let cartMutationQueue = Promise.resolve();
const updateTimers = new Map<string, ReturnType<typeof setTimeout>>();
const updateVersions = new Map<string, number>();

const enqueueCartMutation = (task: () => Promise<void>) => {
  const next = cartMutationQueue.then(task);

  cartMutationQueue = next.catch(() => {});

  return next;
};

function calculateTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
}

function mergeGuestItems(items: CartItem[]): CartItem[] {
  const result = new Map<string, CartItem>();

  for (const item of items) {
    const key = `${item.itemNo}:${item.statusDelivery}`;
    const existing = result.get(key);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      result.set(key, { ...item });
    }
  }

  return [...result.values()];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      guestItems: [],
      total: 0,

      isLoading: false,
      isSyncing: false,
      isInitialized: false,
      error: null,

      calculateGuestCart: () => {
        const guestItems = get().guestItems;
        const total = calculateTotal(guestItems)
        console.log({total, guestItems})
        set({
            total,
        })
      },

      updateGuestQuantity: async (item, count) => {
        if (count < 1) return;
        const previousItems = get().guestItems;
        const guestItems = updateQuantityOptimistically(
          previousItems,
          item,
          count,
        );
        const total = calculateTotal(guestItems);
        set({
          guestItems,
          total,
        });
      },
      updateQuantityItemCart: (item, count) => {
        const itemNo = item.itemNo;

        // optimistic UI
        const previousItems = get().cartItems;

        set({
          cartItems: updateQuantityOptimistically(previousItems, item, count),
        });

        // отменяем старый timer
        const oldTimer = updateTimers.get(itemNo);

        if (oldTimer) {
          clearTimeout(oldTimer);
        }

        // увеличиваем версию
        const version = (updateVersions.get(itemNo) ?? 0) + 1;

        updateVersions.set(itemNo, version);

        const timer = setTimeout(() => {
          updateTimers.delete(itemNo);

          // Проверяем, что это всё ещё последний вызов
          if (updateVersions.get(itemNo) !== version) {
            return;
          }

          enqueueCartMutation(async () => {
            // Ещё раз проверяем
            if (updateVersions.get(itemNo) !== version) {
              return;
            }

            const currentItem = get().cartItems.find(
              (cartItem) => cartItem.itemNo === itemNo,
            );

            if (!currentItem) {
              return;
            }

            console.log(
              "SEND quantity:",
              currentItem.quantity,
              "version:",
              version,
            );

            const response = await cartApi.updateQuantity(
              itemNo,
              currentItem.quantity,
            );

            if (!response.ok) {
              throw new Error("Failed to update quantity");
            }

            // Проверяем, не было ли нового изменения,
            // пока API выполнялся
            if (updateVersions.get(itemNo) !== version) {
              return;
            }

            set({
              cartItems: response.data.items,
              total: response.data.total,
            });
          });
        }, 300);

        updateTimers.set(itemNo, timer);
      },

      removeGuestFromCart: (itemNo) => {
        const previousItems = get().guestItems;
        const guestItems = removeFromCartOptimistically(previousItems, itemNo);
        const total = calculateTotal(guestItems);
        set({
          guestItems,
          total,
        });
      },
      removeFromCart: (itemNo) =>
        enqueueCartMutation(async () => {
          const previousItems = get().cartItems;
          set({
            cartItems: removeFromCartOptimistically(previousItems, itemNo),
          });
          try {
            const response = await cartApi.removeItem(itemNo);
            if (!response.ok) {
              toast.error("Не вдалося видалити товар з кошика");
              throw new Error("Failed delete item cart");
            }
            toast.success("Товар видалено з кошика");
            set({
              cartItems: response.data.items,
              total: response.data.total,
            });
          } catch (error) {
            set({
              cartItems: previousItems,
            });
          }
        }),

      addGuestItem: (item) => {
        const guestItems = mergeGuestItems([...get().guestItems, item]);
        const total = calculateTotal(guestItems);
        set({
          guestItems,
          total,
        });
      },
      addItemToCart: (item) =>
        enqueueCartMutation(async () => {
          const previousItems = get().cartItems;

          const cartItems = addQuantityOptimistically(previousItems, item);

          set({
            cartItems,
          });

          try {
            const response = await cartApi.addItem({
              itemNo: item.itemNo,
              quantity: item.quantity,
              statusDelivery: item.statusDelivery,
            });

            if (!response.ok) {
              toast.error("Не вдалося додати товар до кошика");
              throw new Error("Failed add product to cart");
            }

            set({
              cartItems: response.data.items,
              total: response.data.total,
            });

            toast.success("Товар додано до кошика");
          } catch (error) {
            // rollback только этой операции
            set({
              cartItems: previousItems,
            });

            toast.error("Не вдалося додати товар до кошика");
          }
        }),

      clearCart: () => {
        set({ cartItems: [], total: 0 });
      }, // очищаем когда выходим с аккаунта
      clearGuestItems: () => {
        set({ guestItems: [], total: 0 });
      },

      syncWithServer: async () => {
        const guestItems = get().guestItems;

        set({
          isSyncing: true,
          error: null,
        });

        try {
          const response = await cartApi.syncCart(guestItems);

          if (!response.ok) {
            throw new Error("Не удалось синхронизировать корзину");
          }

          const cart = response.data as CartResponse;

          // Сначала сохраняем результат сервера.
          set({
            cartItems: cart.items,
            total: cart.total,
            guestItems: [],
            isInitialized: true,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Ошибка синхронизации корзины",
          });

          throw error;
        } finally {
          set({ isSyncing: false });
        }
      },
      initializeGuestCart: () => {
        set({ isInitialized: true });
      },

      loadServerCart: async () => {
        set({
          isLoading: true,
          error: null,
        });

        try {
          const response = await cartApi.getCart();
          
          // Адаптируй проверку под тип своего api-клиента.
          if (!response.ok) {
            throw new Error("Не удалось загрузить корзину");
          }

          const cart = response.data as CartResponse;

          set({
            cartItems: cart.items,
            total: cart.total,
            isInitialized: true,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Ошибка загрузки корзины",
          });

          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "guest-cart",
      storage: createJSONStorage(() => localStorage),

      // Серверную корзину и её состояние не сохраняем.
      partialize: (state) => ({
        guestItems: state.guestItems,
      }),

      onRehydrateStorage: () => (state) => {
        state?.initializeGuestCart();
      },
    },
  ),
);
