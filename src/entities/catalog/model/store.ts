import { create } from "zustand";
import { fetchCatalogItems, fetchTopProducts } from "../api/catalog.api";
import { ResponseCatalogItem, ResponseTopProduct } from "../api/dto";
import { CatalogState } from "./types";



export const useCatalogStore = create<CatalogState>((set) => (
    {
        listItems: [],
        listTopProducts: [],
        getListItems: async (typeId: number, groupId: number) => {
            const res: ResponseCatalogItem[] = await fetchCatalogItems(typeId, groupId);
            set({ listItems: res ? res.map((item) => ({ ...item, firstPic: item?.firstPic.replace('tcd/', 'tcd-pic/') })) : [] });
        },
        // getListTopProducts: async (): Promise<ResponseTopProduct> => {
        //     console.log('start request getListTopProducts');
        //     const res: ResponseTopProduct[] = await fetchTopProducts();
        //     set({ listTopProducts: res ? res.map((item) => ({ ...item, firstPic: item?.firstPic.replace('tcd/', 'tcd-pic/') })) : [] });
        //     return res[0] as ResponseTopProduct;
        // },
    }
));