import { CartItem } from "../model/cart.types";

export interface CartResponse {
  items: CartItem[];
  createdAt: string;
  id: number;
  total: number;
  updatedAt: string;
}