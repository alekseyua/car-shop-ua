import { ProductDetail } from "@/src/entities/product-detail/model/types";
import { useCartStore } from "./store";
import { ProductDto } from "./types";
import { getCart } from "../api/cart.api";

export const handleAddToCart = (item: ProductDto | ProductDetail, statusDelivery: string) => {
    // addToCart(item)
    useCartStore.getState().addToCart(item, statusDelivery);
};

export const synchronServerCart = async () => {
        // получили серверную корзину
        const cart = await getCart();

        if (cart.ok) {
            const { data } = cart;
            useCartStore
                .getState()
                .syncWithServer(data.items);
        }
}