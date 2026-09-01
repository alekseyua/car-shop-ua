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