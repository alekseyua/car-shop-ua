import { create } from "zustand";
import { NovaPoshtaCity, NovaPoshtaResponse, WherehouseType } from "./checkout.types";
import { API_KEY_NOVAPOSHTA } from "@/src/config";


interface CheckoutState {
    deliveryMethod: string;
    setDeliveryMethod: (value: string) => void;

    deliveryCity: string;
    deliveryCityRef: string;
    setDeliveryCity: (city: string) => void;
    setDeliveryCityRef: (cityRef: string) => void;
    resetDeliveryCity: () => void;

    commentEnabled: boolean;
    setCommentEnabled: (value: boolean) => void;

    vinCheck: boolean;
    setVinCheck: (value: boolean) => void;

    getListCities: (city: string) => Promise<NovaPoshtaCity[] | []>;
    getWherehouse: (wherehouse: number | string) => any;

    warehouseTypes: WherehouseType[];
    getListWherehouseType: () => void;
}



export const useCheckoutStore = create<CheckoutState>((set, get) => ({
    deliveryMethod: "",
    setDeliveryMethod: (value) =>
        set({
            deliveryMethod: value,
        }),

    deliveryCity: '',
    deliveryCityRef: '',
    setDeliveryCity: (city) => {
        set({
            deliveryCity: city
        })
    },
    setDeliveryCityRef: (cityRef) => {
        set({
            deliveryCityRef: cityRef
        })
    },
    resetDeliveryCity: () => {
        set({
            deliveryCity:'',
            deliveryCityRef: '',

        })
    },

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
            if (!city && city.length < 2) return [];

            const response = await fetch(
                "https://api.novaposhta.ua/v2.0/json/",
                {
                    method: "POST",
                    body: JSON.stringify({
                        apiKey: API_KEY_NOVAPOSHTA,
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
    },

    getWherehouse: async (wherehouse) => {
        try {
            const { deliveryCityRef, deliveryMethod } = get()
            if (wherehouse) {
                const numberWherehouse = Number(wherehouse);
                let methodProperties = {}
                const deliveryPoint = numberWherehouse ? numberWherehouse : wherehouse;
                if(typeof deliveryPoint === 'number'){
                    methodProperties = {
                        ...methodProperties,
                        "WarehouseId": deliveryPoint
                    }
                } else {
                    methodProperties = {
                        ...methodProperties,
                        "FindByString": deliveryPoint
                    }
                }
                const options = {
                    "apiKey": API_KEY_NOVAPOSHTA,
                    "modelName": "AddressGeneral",
                    "calledMethod": "getWarehouses",
                    "methodProperties": {
                        "CityRef": deliveryCityRef,
                        "TypeOfWarehouseRef": deliveryMethod,
                        ...methodProperties
                    }
                }
                const response = await fetch(
                    "https://api.novaposhta.ua/v2.0/json/",
                    {
                        method: 'POST',
                        body: JSON.stringify(options)
                    },
                );
                const res = await response.json();
                console.log(res.data)
            }

        } catch (error) {
            throw error;
        }
    },

    warehouseTypes: [],
    getListWherehouseType: async () => {
        try {
            const options = {
                "apiKey": API_KEY_NOVAPOSHTA,
                "modelName": "AddressGeneral",
                "calledMethod": "getWarehouseTypes",
                "methodProperties": {}
            }
            const response = await fetch(
                "https://api.novaposhta.ua/v2.0/json/",
                {
                    method: "POST",
                    body: JSON.stringify(options),
                })
            const res = await response.json();
            set({
                warehouseTypes: res.data,
            });
        } catch (error) {
            throw error;
        }
    }
}));