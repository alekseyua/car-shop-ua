import { CheckoutFormValues } from "@/src/widgets/checkout-form/model/checkout.types";
import { createOrder } from "../api/order.api";

export function useCreateOrder() {

    async function submit(data: any) {
        return createOrder(data);
    }

    return {
        submit,
    };
}