import { CriteriaItem, ResponseStockDto } from "@/src/shared/api/dto";

export interface ProductItemDetail {
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
  longText: string | null;
}

export interface ProductDetailResponse {
  files: fileItem[];
  item: ProductItemDetail;
  replaces: ProductItemDetail[];
  pictures: string[];
}

interface fileItem {
  comID: string;
  itemNo: string;
  sort: string;
  manual: string;
  pathName: string;
  fileName: string;
  url: string;
  fileType: string;
  fileDescript: string;
}
