import { create } from "zustand";
import { ResponseMyOrder } from "./order.types";
import { api } from "@/src/shared/api/client";

interface OrderState {
  getListMyOrders: () => Promise<void>;
  listMyOrders: ResponseMyOrder[];
  isLoadingMyOrders: boolean;
  errorMyOrders: string | null;
}
export const useOrderStore = create<OrderState>((set) => ({
  listMyOrders: [],
  isLoadingMyOrders: false,
  errorMyOrders: null,

  getListMyOrders: async () => {
    set({ isLoadingMyOrders: true });
    try {
      const url = "/orders";
      const response = await api(url, {
        method: "GET",
      });
      if (response.ok) {
        set({
          listMyOrders: response.data as ResponseMyOrder[],
        });
      }
    } catch (error) {
      set({
        errorMyOrders: "Error fetching orders",
      });
      throw error;
    } finally {
      set({ isLoadingMyOrders: false });
    }
  },
}));
