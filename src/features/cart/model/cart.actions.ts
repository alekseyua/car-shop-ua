import { ProductImageDetail } from "@/src/entities/product-detail/model/detail.types";
import { useCartStore } from "./cart.store";
import { ProductDto } from "./cart.types";
import { getCart } from "../api/cart.api";

export const handleAddToCart = (item: ProductDto | ProductImageDetail, statusDelivery: string) => {
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