import { Catalog } from "../../../features/vehicleFilters/model/vehicle.type";
import { ResponseCatalogItem, ResponseTopProduct } from "../api/dto";

export interface TransformCatalog {
    [key:string]: Catalog[]; 
}

export interface CatalogState {
  getListItemsCatalogCatalog: (typeId: number, groupId: number) => void;
  resetListItemsCatalog: () => void;

  getTopProduct: () => Promise<void>;
  resetTopProduct: () => void;
  // getListTopProducts: () => Promise<ResponseTopProduct[]>;
  listItemsCatalog: ResponseCatalogItem[];
  listTopProducts: ResponseTopProduct[];
  isLoadingItemsCatalog: boolean;
  isLoadingTopProducts: boolean;

  itemsCatalogError: string | null;
  topProductsError: string | null;
};
