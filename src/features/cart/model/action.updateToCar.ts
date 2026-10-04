import { CartItem } from "@/src/entities/cart/model/types";
import { useAuthStore } from "../../auth-by-email/model/auth.store";
import { useCartStore } from "@/src/entities/cart/model/cart.store";

export const handleUpdateToCart = (item: CartItem, count: number) => {
  const user = useAuthStore.getState().user;
  const updateGuestQuantity = useCartStore.getState().updateGuestQuantity;
  const updateQuantityItemCart = useCartStore.getState().updateQuantityItemCart;
  if (user) {
    console.log("update to cart then login");
    updateQuantityItemCart(item, count);
  } else {
    console.log("update without login");
    updateGuestQuantity(item, count);
  }
};
