import { create } from "zustand";
import { fetchCatalogItems, fetchTopProducts } from "../api/catalog.api";
import { ResponseCatalogItem } from "../api/dto";
import { CatalogState } from "./types";



export const useCatalogStore = create<CatalogState>((set) => ({
  listItemsCatalog: [],
  listTopProducts: [],
  isLoadingItemsCatalog: false,
  isLoadingTopProducts: false,

  itemsCatalogError: null,
  topProductsError: null,
  getListItemsCatalogCatalog: async (
    typeId: number,
    groupId: number,
  ) => {
    set({
      isLoadingItemsCatalog: true,
      itemsCatalogError: null,
    });

    try {
      const res: ResponseCatalogItem[] =
        await fetchCatalogItems(typeId, groupId);

      set({
        listItemsCatalog: res ?? [],
      });
    } catch (error) {
      console.error("Catalog items error:", error);

      set({
        listItemsCatalog: [],
        itemsCatalogError:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить каталог",
      });
    } finally {
      set({
        isLoadingItemsCatalog: false,
      });
    }
  },

  resetListItemsCatalog: () => {
    set({
      listItemsCatalog: [],
      itemsCatalogError: null,
    });
  },

  getTopProduct: async () => {
    set({
      isLoadingTopProducts: true,
      topProductsError: null,
    });

    try {
      const res = await fetchTopProducts();
        console.log({res})
      set({
        listTopProducts: res ?? [],
      });
    } catch (error) {
      console.error("Top products error:", error);

      set({
        listTopProducts: [],
        topProductsError:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить популярные товары",
      });
    } finally {
      set({
        isLoadingTopProducts: false,
      });
    }
  },

  resetTopProduct: () => {
    set({
      listTopProducts: [],
      topProductsError: null,
    });
  },
}));