export interface ResponseCatalogItem {
    itemNo: string;
    brand: string;
    quantity: number;
    description: string;
    searchDescription: string;
    inStock: boolean;
    firstPic: string;
    criteriaLine: string;
    retail: number;
    price: number;
    salesUoM: string;
    criterias: Criteria[];
    stock: StockContainer;
}

export interface Criteria {
    itemNo: string;
    criteria: string;
    value: string;
}

export interface StockContainer {
    Stock: StockItem[];
}

export interface StockItem {
    L: string;
    C: string;
    Q: string;
    R: number;
}

export interface ResponseTopProduct {
    brand: string;
    criteriaLine: string;
    criterias: string[];

    description: string;
    longText: string | null;
    searchDescription: string;

    firstPic: string;

    groupCode: string;
    subGroupCode: string;

    itemNo: string;

    inStock: boolean;
    quantity: number;

    price: number;
    retail: number;

    salesUoM: string;

    stock: StockItem[];
}