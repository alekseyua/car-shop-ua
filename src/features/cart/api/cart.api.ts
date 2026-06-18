import { api } from "@/src/shared/api/client";
import { CartResponse } from "./response.dto";
import { AddToCartDto } from "./query.dto";

export const getCart = async () => {
    const result = await api<CartResponse>("/cart", {
        method: "GET",
    });
    if(!result.ok){
        throw new Error('Field get cart')
    }
    return result;
};


export const addCartItem = (item: AddToCartDto) => {
    return api("/cart/items", {
        method: "POST",
        body: JSON.stringify(item),
    });
};