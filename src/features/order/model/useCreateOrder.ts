import { CheckoutFormValues } from "@/src/widgets/checkout-form/model/checkout.types";
import { createOrder } from "../api/order.api";
import { ApiResult } from "@/src/shared/api/client";
import { ResponseOrder } from "../api/response.dto";

export function useCreateOrder() {

     function submit(data: CheckoutFormValues):Promise<ApiResult<ResponseOrder>> {
      return createOrder(data);
    }

    return {
        submit,
    };
}