import { CartItem } from "@/src/entities/cart/model/types";
import { useAuthStore } from "../../auth-by-email/model/auth.store";
import { useCartStore } from "@/src/entities/cart/model/cart.store";
import useModal from "@/src/hooks/use-modal";

export const handleAddToCart = (item: CartItem) => {
  const user = useAuthStore.getState().user;
  const addGuestItem = useCartStore.getState().addGuestItem;
  const addItemToCart = useCartStore.getState().addItemToCart;
  const openModal = useModal.getState().openModal;
  openModal({ type: "cart" });
  if (user) {
    console.log("ADD to cart then login");
    addItemToCart(item);
  } else {
    console.log("without login");
    addGuestItem(item);
  }
};
