import { create } from "zustand";
import { fetchCatalogItems } from "../api/catalog.api";
import { ResponseCatalogItem } from "../api/dto";

interface CatalogState {
    getListItems: (typeId: number, groupId: number) => void;
    listItems: ResponseCatalogItem[];
}

export const useCatalogStore = create<CatalogState>((set) => (
    {
        listItems: [],
        getListItems: async (typeId: number, groupId: number) => {
            console.log(`Fetching list items for typeId: ${typeId}, groupId: ${groupId}`);
            const res: ResponseCatalogItem[] = await fetchCatalogItems(typeId, groupId);
            set({ listItems: res ? res.map((item) => ({ ...item, firstPic: item?.firstPic.replace('tcd/', 'tcd-pic/') })) : [] });
        }
    }
));