export interface PaginationDto<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface ResponseStockDto {
  isStock: boolean;
  quantity: number;
  statusDelivery: DeliveryStatus;
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