import { CriteriaItem, ResponseStockDto } from "@/src/shared/api/dto";

export interface ProductImageDetail {
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

export interface ProductDetailResponse {
  files: string[];
  item: ProductImageDetail;
  replaces: ProductImageDetail[];
  pictures: string[];
}
