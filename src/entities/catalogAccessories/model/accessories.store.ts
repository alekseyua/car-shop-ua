import { create } from "zustand";
import {
  fetchCatalogAccessories,
  getListCatalogAccessories,
} from "../api/accessories.api";
import { CategoriesResponse, ProductAccessories } from "./accessories.type";
import { PaginationDto } from "@/src/shared/api/dto";
import { useCatalogStore } from "../../catalog/model/catalog.store";

interface CatalogAccessoriesStore {
  accessoriesMenu: CategoriesResponse;

  catalogAccessories: ProductAccessories[];

  page: number;
  limit: number;
  total: number;
  totalPages: number;

  isLoading: boolean;
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  resetCategoryId: () => void;
  getAccessoriesMenu: () => Promise<void>;

  getCatalogAccessories: (id: number, page?: number, append?: boolean) => Promise<void>;

  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  showMore: () => Promise<void>;
}

export const useAccessoriesStore = create<CatalogAccessoriesStore>((set, get) => ({
  accessoriesMenu: [],
  catalogAccessories: [],

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,

  isLoading: false,
  categoryId: null,
  setCategoryId: (id) => {
    // if(id) {
    //     useCatalogStore.getState().resetListItemsCatalog();
    //     useCatalogStore.getState().
    // }
    set({ categoryId: id });
  },
  resetCategoryId: () => {
    set({
      categoryId: null,
    });
  },
  getAccessoriesMenu: async () => {
    const res = await getListCatalogAccessories();

    set({
      accessoriesMenu: res,
    });
  },

  getCatalogAccessories: async (id, page = 1, append) => {
    set({
      isLoading: true,
    });

    try {
      const response: PaginationDto<ProductAccessories> =
        await fetchCatalogAccessories(id, page, 10);

      set((state) => ({
        catalogAccessories: append
          ? [...state.catalogAccessories, ...response.data]
          : response.data,

        page: response.meta.page,
        limit: response.meta.limit,
        total: response.meta.total,
        totalPages: response.meta.totalPages,
      }));
    } catch (error) {
      set({
        isLoading: false,
      });

      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  nextPage: async () => {
    const state = useAccessoriesStore.getState();
    const id = get().categoryId;
    if (!id || state.isLoading || state.page >= state.totalPages) {
      return;
    }

    await state.getCatalogAccessories(id, state.page + 1);
  },

  prevPage: async () => {
    const state = useAccessoriesStore.getState();
    const id = get().categoryId;
    if (!id || state.isLoading || state.page <= 1) {
      return;
    }

    await state.getCatalogAccessories(id, state.page - 1);
  },
  goToPage: async (page: number) => {
    const state = useAccessoriesStore.getState();
    const categoryId = get().categoryId;

    if (
      !categoryId ||
      state.isLoading ||
      page < 1 ||
      page > state.totalPages ||
      page === state.page
    ) {
      return;
    }

    await state.getCatalogAccessories(categoryId, page);
  },
  showMore: async () => {
    const { page, categoryId, getCatalogAccessories, isLoading } = get();

    if (!categoryId || isLoading || !page) {
      return;
    }

    await getCatalogAccessories(categoryId, page + 1, true);
  },
}));
