export interface ProductSearch {
  itemNo: string;
  name: string;
  price: string;
  catItemNo: string;
};

export interface ProductsSearchResponse {
  total: number;
  products: ProductSearch[];
};
