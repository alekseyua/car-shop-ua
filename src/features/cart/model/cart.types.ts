import { ResponseCatalogItem, ResponseTopProduct } from "@/src/entities/catalog/api/dto";
import { ProductAccessories } from "@/src/entities/catalogAccessories/model/accessories.type";
import { ProductItemDetail } from "@/src/entities/product-detail/model/detail.types";
import { DeliveryStatus } from "@/src/shared/api/dto";


export interface CartStore {
    cartItems: CartItem[];
    total: number;
    addToCart: (item: | ResponseCatalogItem
        | ResponseTopProduct
        | ProductAccessories
        | ProductItemDetail, statusDelivery: string) => void;
    removeFromCart: (itemNo: string) => void;
    clearCart: () => void;
    changeQuantity: (itemNo: string, count: number) => void;
    syncWithServer: (items: CartItem[], total: number) => void;
}

export interface CartItem {
    itemNo: string;
    brand: string;
    title: string;
    searchDescription: string;
    imageUrl: string;
    groupCode?: string;
    subGroupCode?: string;
    price: number;
    retail: number;
    salesUoM?: string;
    stock: ProductStock[];

    quantity: number; // Quantity of the item in the cart
    statusDelivery: string;
}
export interface ProductDto {
    itemNo: string;
    brand: string;
    description: string;
    searchDescription: string;

    firstPic: string;

    groupCode: string;
    subGroupCode: string;

    inStock: boolean;

    price: number;
    retail: number;

    salesUoM: string;

    stock: ProductStock[];
}

export interface ProductStock {
  isStock: boolean;
  quantity: number;
  statusDelivery: DeliveryStatus;
}