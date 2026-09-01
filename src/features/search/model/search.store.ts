import { create } from "zustand";
import { searchState } from "./search.types";
import { getSearchApi } from "../api/search.api";

export const useSearchStore = create<searchState>((set) => ({
  listSearch: [],
  setListSearch: (data) => {
},
getListSearch: async (q) => {
    const res = await getSearchApi(q);
    set({
      listSearch: res.products,
    });
    console.log({res})
  },
}));