import { create } from "zustand";
import { fetchCatalogItems, fetchTopProducts } from "../api/catalog.api";
import { ResponseCatalogItem } from "../api/dto";

interface CatalogState {
    getListItems: (typeId: number, groupId: number) => void;
    getListTopProducts: () => void;
    listItems: ResponseCatalogItem[];
    listTopProducts: ResponseCatalogItem[];
}

export const useCatalogStore = create<CatalogState>((set) => (
    {
        listItems: [],
        listTopProducts: [],
        getListItems: async (typeId: number, groupId: number) => {
            const res: ResponseCatalogItem[] = await fetchCatalogItems(typeId, groupId);
            set({ listItems: res ? res.map((item) => ({ ...item, firstPic: item?.firstPic.replace('tcd/', 'tcd-pic/') })) : [] });
        },
        getListTopProducts: async () => {
            console.log('start request getListTopProducts');
            const res: ResponseCatalogItem[] = await fetchTopProducts();
            set({ listTopProducts: res ? res.map((item) => ({ ...item, firstPic: item?.firstPic.replace('tcd/', 'tcd-pic/') })) : [] });
        },
    }
));