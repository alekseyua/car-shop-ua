import { create } from "zustand";
import { fetchCatalogItems, fetchTopProducts } from "../api/catalog.api";
import { ResponseCatalogItem } from "../api/dto";
import { CatalogState } from "./types";



export const useCatalogStore = create<CatalogState>((set) => (
    {
        listItemsCatalog: [],
        listTopProducts: [],
        getListItemsCatalogCatalog: async (typeId: number, groupId: number) => {
            const res: ResponseCatalogItem[] = await fetchCatalogItems(typeId, groupId);
            set({ listItemsCatalog: res ?? [] });
        },
        resetListItemsCatalog: () => {
            set({
                listItemsCatalog: []
            })
        },

        getTopProduct: async () => {
            const res = await fetchTopProducts();
            set({
                listTopProducts: res
            })
        },
        resetTopProduct: () => {
            set({
                listTopProducts: [],
            });
        }
    }
));