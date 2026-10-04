import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";

export const handleLogout = () => {
  useAuthStore.getState().logout();
  useCartStore.getState().clearCart();
  // localStorage.removeItem("auth-storage");
  useAuthStore.persist.clearStorage();
};
