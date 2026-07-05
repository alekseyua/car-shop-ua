import { api } from "@/src/shared/api/client";
import { create } from "zustand";
import { ResponseMyOrder } from "./profile.types";

export interface ProfileState {
  listOrderUser: [];
  listMyOrders: ResponseMyOrder[];
  currentSection: number;
  isLoadingMyOrders: boolean;
  errorMyOrders: string | null;

  setCurrentSection: (section: number) => void;
  getListMyOrders: () => Promise<void>;
}
export const useProfileStore = create<ProfileState>((set) => ({
  listOrderUser: [],
  listMyOrders: [],
  isLoadingMyOrders: false,
  errorMyOrders: null,

  currentSection: 0,
  setCurrentSection: (section) => {
    set({
      currentSection: section,
    });
  },
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
        errorMyOrders: 'Error fetching orders',
      })
      throw error;
    } finally{
      set({isLoadingMyOrders: false});
    }
  },
}));
