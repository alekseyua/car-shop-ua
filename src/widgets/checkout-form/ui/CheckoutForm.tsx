'use client';

import {
    FormProvider,
    useForm
} from "react-hook-form";
import ContactFields
    from "./ContactFields";
import CitySelect
    from "./CitySelect";
import DeliveryMethod
    from "./DeliveryMethod";
import CommentBox
    from "./CommentBox";
import VinCheck
    from "./VinCheck";
import {
    CheckoutFormValues
}
    from "../model/checkout.types";
import { useCreateOrder } from "@/src/features/order/model/useCreateOrder";
import { useCheckoutStore } from "../model/checkout.store";

export default function CheckoutForm() {
    const { submit } = useCreateOrder();
    const {
        deliveryMethod,
        deliveryCityRef,
    } = useCheckoutStore();
    const methods = useForm<CheckoutFormValues>({
      defaultValues: {
        deliveryCity: "",
        deliveryPhone: "",
        deliveryEmail: "",
        deliveryLastname: "",
        deliveryFirstname: "",
        deliveryMiddlename: "",
        deliveryComment: "",
        deliveryVin: "",
        deliveryPoint: "",
        deliveryPointRef: "",
        deliveryStreet: "",
        deliveryHouse: "",
        deliveryApartment: "",
      },
    });


    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            await submit({
                ...data,
                deliveryMethod,
                deliveryCityRef,
            });
        } catch (e) {
            throw e;
        }
    };



    return (
        <FormProvider {...methods}>
            <form
                onSubmit={
                    methods.handleSubmit(onSubmit)
                }
                className="
                    max-w-4xl
                    mx-auto
                    bg-white
                    p-6
                    rounded-xl
                    "
            >
                <ContactFields />
                <div className="border-t my-8" />
                <CitySelect />
                <div className="border-t my-8" />
                <DeliveryMethod />
                <CommentBox />
                <VinCheck />
                <button
                    type="submit"
                    className="
                                w-full
                                h-14
                                mt-8
                                bg-red-600
                                text-white
                                rounded-lg
                                font-semibold
                                "
                >
                    Замовлення підтверджую
                </button>
            </form>
        </FormProvider>
    )
}