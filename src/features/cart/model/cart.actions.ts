import { ProductItemDetail } from "@/src/entities/product-detail/model/detail.types";
import { useCartStore } from "./cart.store";
import { ProductDto } from "./cart.types";
import { getCart } from "../api/cart.api";
import { ProductAccessories } from "@/src/entities/catalogAccessories/model/accessories.type";
import { ResponseCatalogItem, ResponseTopProduct } from "@/src/entities/catalog/api/dto";

export const handleAddToCart = (item: | ResponseCatalogItem
    | ResponseTopProduct
    | ProductAccessories
    | ProductItemDetail, statusDelivery: string) => {
    // addToCart(item)
    useCartStore.getState().addToCart(item, statusDelivery);
};

export const syncServerCart = async () => {
        // получили серверную корзину
        const cart = await getCart();

        if (cart.ok) {
            const { data } = cart;
            useCartStore
                .getState()
                .syncWithServer(data.items, data.total);
        }
}