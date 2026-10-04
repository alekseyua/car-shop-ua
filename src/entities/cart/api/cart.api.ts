// src/entities/cart/api/cart.api.ts

import { api } from "@/src/shared/api/client";
import type { AddToCartDto, CartResponse } from "../model/types";

export const cartApi = {
  getCart: async () => {
    const result = await api<CartResponse>("/cart", {
      method: "GET",
    });
    return result;
  },

  addItem: (dto: AddToCartDto) =>
    api<CartResponse>("/cart/items", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  updateQuantity: async (itemNo: string, count: number) => {
    return await api<CartResponse>(`/cart/update-quantity/${itemNo}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity: count,
      }),
    });
  },

  removeItem: async (itemNo: string) => {
    const res = await api<CartResponse>(`/cart/items/${itemNo}`, {
      method: "DELETE",
    });

    return res;
  },

  syncCart: async (items: AddToCartDto[]) => {
    const res = await api("/cart/sync", {
      method: "POST",
      body: JSON.stringify(items),
    });

    return res;
  },
};
