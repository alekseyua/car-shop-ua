import { ResponseStockDto } from "@/src/shared/api/dto";

export interface CategoryAccessories {
  comId: number;
  sort: number;
  id: number;
  parentId: number;
  col: number;
  active: boolean;
  img: string | null;
  title: string;
  itemGroup: string;
  itemSubGroup: string;
  childElements: CategoryAccessories[];
}

export type CategoriesResponse = CategoryAccessories[];

export interface ProductAccessories {
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

  /**
   * JSON string с информацией о наличии на складах.
   */
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

  criterias: unknown[];

  probablyDatePrih: string | null;
  probablyDatePrihDiff: number;

  checkSend: boolean;
}