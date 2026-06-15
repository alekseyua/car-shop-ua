import { ProductDetail } from "@/src/entities/product-detail/model/types";
import { useCartStore } from "./store";
import { ProductDto } from "./types";

export const handleAddToCart = (item: ProductDto | ProductDetail) => {
    // addToCart(item)
    useCartStore.getState().addToCart(item);
};