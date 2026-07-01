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

export default function CheckoutForm() {

    const methods =
        useForm<CheckoutFormValues>({
            defaultValues: {
                phone: "",
                email: "",
                lastname: "",
                firstname: "",
                middlename: "",
                city: "",
                comment: "",
                vin: ""
            }
        });

    const submit =
        (data: CheckoutFormValues) => {

            console.log(data);

        };



    return (
        <FormProvider {...methods}>
            <form
                onSubmit={
                    methods.handleSubmit(submit)
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