import { useCartStore } from "@/src/entities/cart/model/cart.store";

export async function syncCartAfterLogin(): Promise<void> {
  await useCartStore.getState().syncWithServer();
}
