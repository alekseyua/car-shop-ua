import { Catalog } from "../../../features/vehicleFilters/model/type";
import { ResponseCatalogItem, ResponseTopProduct } from "../api/dto";

export interface TransformCatalog {
    [key:string]: Catalog[]; 
}

export interface CatalogState {
    getListItems: (typeId: number, groupId: number) => void;
    getListTopProducts: () => Promise<ResponseTopProduct>;
    listItems: ResponseCatalogItem[];
    listTopProducts: ResponseTopProduct[];
};
