import { DeliveryStatus } from "@/src/entities/product-detail/model/types";


export interface CartStore {
    cartItems: CartItem[];
    addToCart: (item: ProductDto) => void;
    removeFromCart: (itemNo: string) => void;
    clearCart: () => void;
}

export interface CartItem {
    itemNo: string;
    brand: string;
    description: string;
    searchDescription: string;
    firstPic: string;
    groupCode: string;
    subGroupCode: string;
    price: number;
    retail: number;
    salesUoM: string;
    stock: ProductStock[];

    quantity: number; // Quantity of the item in the cart
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