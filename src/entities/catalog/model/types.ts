import { Catalog } from "../../../features/vehicleFilters/model/vehicle.type";
import { CarDetails, CarResponse, ResponseCatalogItem, ResponseTopProduct } from "../api/dto";

export interface TransformCatalog {
    [key:string]: Catalog[]; 
}

export interface CatalogState {
  getListItemsCatalogCatalog: (typeId: number, groupId: number) => void;
  resetListItemsCatalog: () => void;

  getTopProduct: () => Promise<void>;
  resetTopProduct: () => void;
  // getListTopProducts: () => Promise<ResponseTopProduct[]>;
  currentItemCatalog: number | null;
  listItemsCatalog: ResponseCatalogItem[];
  listTopProducts: ResponseTopProduct[];
  isLoadingItemsCatalog: boolean;
  isLoadingTopProducts: boolean;

  itemsCatalogError: string | null;
  topProductsError: string | null;

  kroonOilCarCatalog: CarResponse | null;
  kroonOilDetailCarCatalog: CarDetails | null;
  isLoadingKroonOilCarCatalog: boolean;
  isLoadingKroonOilDetailCarCatalog: boolean;
  getKroonOilCarCatalog: (nameSearch: string) => Promise<void>;
  getKroonOilDetailCarCatalog: ({}) => void;
};
