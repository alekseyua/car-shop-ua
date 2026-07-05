import { api } from "@/src/shared/api/client";
import { create } from "zustand";
import { ResponseMyOrder } from "./profile.types";

export interface ProfileState {
  listOrderUser: [];
  listMyOrders: ResponseMyOrder[];
  currentSection: number;

  setCurrentSection: (section: number) => void;
  getListMyOrders: () => void;
}
export const useProfileStore = create<ProfileState>((set) => ({
  listOrderUser: [],
  listMyOrders: [],

  currentSection: 0,
  setCurrentSection: (section) => {
    set({
      currentSection: section
    })
  },
  getListMyOrders: async () => {
    try {
      const url = '/orders';
      const response = await api(url, {
        method: 'GET',
      });
      if(response.ok){
        set({
          listMyOrders: response.data as ResponseMyOrder[],
        });
      }
    } catch (error) {
      throw error;
    }
  },


}));
