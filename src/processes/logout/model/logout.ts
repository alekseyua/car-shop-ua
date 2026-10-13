import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { logoutUser } from "@/src/features/auth-by-email/api/auth.api";
import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";

export const handleLogout = async () => {
  try {
    await logoutUser();
  } finally {
    useAuthStore.getState().logout();
    useCartStore.getState().clearCart();
  }

  // localStorage.removeItem("auth-storage");
  // useAuthStore.persist.clearStorage();
};
