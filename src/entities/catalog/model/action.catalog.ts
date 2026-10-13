import { useCatalogStore } from "./catalog.store"

export const handleKroonOilCarCatalog = (q: string) => {
    useCatalogStore.getState().getKroonOilCarCatalog(q);
}