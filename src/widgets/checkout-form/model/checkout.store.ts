import { create } from "zustand";


interface CheckoutState {

    deliveryMethod: string;

    setDeliveryMethod:
    (value: string) => void;


    commentEnabled: boolean;

    setCommentEnabled:
    (value: boolean) => void;


    vinCheck: boolean;

    setVinCheck:
    (value: boolean) => void;

}



export const useCheckoutStore =
    create<CheckoutState>((set) => ({

        deliveryMethod: "",

        setDeliveryMethod: (value) =>
            set({
                deliveryMethod: value
            }),



        commentEnabled: false,

        setCommentEnabled: (value) =>
            set({
                commentEnabled: value
            }),



        vinCheck: false,

        setVinCheck: (value) =>
            set({
                vinCheck: value
            })

    }));