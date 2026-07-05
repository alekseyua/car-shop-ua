import { api, ApiResult } from "@/src/shared/api/client";
import { CheckoutFormValues } from "@/src/widgets/checkout-form/model/checkout.types";
import { ResponseOrder } from "./response.dto";

export const createOrder = (dto: CheckoutFormValues): Promise<ApiResult<ResponseOrder>> => {

  try {
    const url = "/orders";
    const response: Promise<ApiResult<ResponseOrder>> = api(url, {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const getListMyOrders = (): Promise<ApiResult<ResponseOrder[]>> => {
    try{
        const url = "/orders";
        const response: Promise<ApiResult<ResponseOrder[]>> = api(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response;
    }catch(e){throw e;}
}