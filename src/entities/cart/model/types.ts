export interface AddToCartDto {
  itemNo: string;
  quantity: number;
  statusDelivery: string;
}

export interface CartItem extends AddToCartDto {
  title: string;
  price: number;
  imageUrl: string | null;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export interface CartState {
  cartItems: CartItem[];
  total: number;
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
}

export type CartMutation = {
  itemId: number;
  delta: number;
  baseQuantity: number;
};
