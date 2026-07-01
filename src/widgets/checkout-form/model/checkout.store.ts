import { create } from "zustand";
import { NovaPoshtaCity, NovaPoshtaResponse } from "./checkout.types";


interface CheckoutState {
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;

  commentEnabled: boolean;
  setCommentEnabled: (value: boolean) => void;

  vinCheck: boolean;
  setVinCheck: (value: boolean) => void;

  getListCities: (city: string) => Promise<NovaPoshtaCity[] | []>;
}



export const useCheckoutStore = create<CheckoutState>((set) => ({
  deliveryMethod: "",

  setDeliveryMethod: (value) =>
    set({
      deliveryMethod: value,
    }),

  commentEnabled: false,

  setCommentEnabled: (value) =>
    set({
      commentEnabled: value,
    }),

  vinCheck: false,

  setVinCheck: (value) =>
    set({
      vinCheck: value,
    }),

    getListCities: async (city: string): Promise<NovaPoshtaCity[] | []> => {
        try {
            if(!city && city.length < 2) return [];

            const response = await fetch(
              "https://api.novaposhta.ua/v2.0/json/",
              {
                method: "POST",
                body: JSON.stringify({
                  apiKey: "4c4ef8b89a1d290784ae940bdb6ab710",
                  modelName: "AddressGeneral",
                  calledMethod: "getCities",
                  methodProperties: {
                    Limit: "20",
                    Page: "1",
                    FindByString: city,
                  },
                }),
              },
            );
            const res: NovaPoshtaResponse = await response.json();
            return res.data;

        } catch (error) {
            throw error;
        }
    }
}));