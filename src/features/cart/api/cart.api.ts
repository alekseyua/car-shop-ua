import { api } from "@/src/shared/api/client";
import { CartResponse } from "./response.dto";

export const getCart = async () => {
    const result = await api<CartResponse>("/cart", {
        method: "GET",
    });
    if(!result.ok){
        throw new Error('Field get cart')
    }
    return result;
};


export const addCartItem = (item: {
    itemNo: string;
    quantity: number;
}) => {
    return api("/cart/items", {
        method: "POST",
        body: JSON.stringify(item),
    });
};