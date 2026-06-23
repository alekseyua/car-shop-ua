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

export const deleteItemFromCart = async ( itemNo: string) => {
    try {
        const url = `/cart/items/${itemNo}`;
        const res = await api(url,{
            method: 'DELETE',
        });
        console.log('response delete item from cart: ', res)
    } catch (error) {
        throw error;
    }
}

export const updateQuantityItemCart = async (itemNo: string, count: number) => {
    try {
        const url = `/cart/update-quantity/${itemNo}`;
        const res = await api(url, {
            method: 'PATCH',
            body: JSON.stringify({
                quantity: count
            })
        })
    } catch (error) {
        throw error;
    }
}