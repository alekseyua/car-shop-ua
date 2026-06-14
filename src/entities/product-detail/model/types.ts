export interface ProductDetail {
  comId: number;
  itemNo: string;
  brand: string;
  quantity: number;
  description: string;
  searchDescription: string;
  longText: string | null;
  shortText: string | null;
  discGroup: string;
  weight: number | null;
  replaceExist: boolean;
  isEntry: boolean | null;
  inStock: boolean;
  search: string | null;
  sCode: string;
  sBrand: string;
  sort: number;
  firstPic: string;
  criteriaLine: string;
  retail: number;
  price: number;

  stock: ResponseStockDto[];

  inAction: boolean | null;
  groupCode: string;
  subGroupCode: string;
  discontinued: boolean;
  salesUoM: string;
  summ: number;
  increaseFactor: number;
  itemNo2: string;
  salesOrderMultiple: number;
  blockSalesReturn: boolean;

  criterias: CriteriaItem[];

  probablyDatePrih: string | null;
  probablyDatePrihDiff: number;
  checkSend: boolean;
}

export interface StockItem {
  L: string;
  C: string;
  Q: string;
  R: number;
}

export interface CriteriaItem {
  itemNo: string;
  criteria: string;
  value: string;
}

export interface ProductDetailResponse {
  files: string[];
  item: ProductDetail;
  replaces: ProductDetail[];
  pictures: string[];
}

export type DeliveryStatus =
  | "today"
  | "tomorrow"
  | "in 2 days"
  | "in 3 days"
  | "in 4 days"
  | "in 5 days"
  | "in 6 days"
  | "in 7 days"
  | "more than 7 days"
  | "notAvailable"
  | "reserved";

export interface ResponseStockDto {
  isStock: boolean;
  quantity: number;
  statusDelivery: DeliveryStatus;
}