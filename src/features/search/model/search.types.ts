import { ProductSearch, ProductsSearchResponse } from "../api/search.types";

export interface searchState {
  listSearch: ProductSearch[];
  setListSearch: (data: ProductsSearchResponse) => void;
  getListSearch: (q: string) => Promise<void>;
}