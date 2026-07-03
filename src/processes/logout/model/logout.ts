import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { useCartStore } from "@/src/features/cart/model/cart.store";

export const handleLogout = () => {
    useAuthStore.getState().logout()
    useCartStore.setState({
        cartItems: []
    })
    localStorage.removeItem("auth-storage");
};

