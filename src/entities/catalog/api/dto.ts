import { CriteriaItem, ResponseStockDto } from "@/src/shared/api/dto";

export interface ResponseCatalogItem {
  itemNo: string;
  brand: string;
  description: string;
  searchDescription: string;
  inStock: boolean;
  firstPic: string;
  retail: number;
  price: number;
  stock: ResponseStockDto[];
  salesOrderMultiple: number;
  criterias: CriteriaItem[];
}

export interface ResponseTopProduct {
  itemNo: string;
  brand: string;
  description: string;
  searchDescription: string;
  inStock: boolean;
  firstPic: string;
  retail: number;
  price: number;
  stock: ResponseStockDto[];
  salesOrderMultiple: number;
  criterias: CriteriaItem[];
}

// ----------------------------------- kroonOil --------------
export type CarItem = {
  title: string;
  years: string;
  url: string;
  id: number;
};

export type CarCategory = {
  title: string;
  items: CarItem[];
};

export type CarResponse = {
    categories: CarCategory[]
};

export type CarDetails = {
  id: number;
  title: string;
  years: string;
  components: CarComponent[];
};

export type CarComponent = {
  title: string;
  products: CarProduct[];
  volume: string;
  replacement: string;
};

export type CarProduct = {
  title: string;
  url: string;
  id: number;
  kroonCode: string;
  code: string;
};