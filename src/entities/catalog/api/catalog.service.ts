import { useCatalogStore } from "../model/catalog.store";

export async function getTopProducts() {
    useCatalogStore.getState().getTopProduct();
}