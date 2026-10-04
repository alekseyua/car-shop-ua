import { CartItem } from "@/src/entities/cart/model/types";
import { useAuthStore } from "../../auth-by-email/model/auth.store";
import { useCartStore } from "@/src/entities/cart/model/cart.store";

export const handleRemoveToCart = (itemNo: string) => {
  const user = useAuthStore.getState().user;
  const removeGuestFromCart = useCartStore.getState().removeGuestFromCart;
  const removeFromCart = useCartStore.getState().removeFromCart;
    removeFromCart(itemNo);

  // if (user) {
  //   console.log("remove from cart then login");
  //   removeFromCart(itemNo);
  // } else {
  //   console.log("remove without login");
  //   removeGuestFromCart(itemNo);
  // }
};
