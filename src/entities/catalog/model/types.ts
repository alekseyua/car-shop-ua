import { Catalog } from "../../../features/vehicleFilters/model/type";

export interface TransformCatalog {
    [key:string]: Catalog[]; 
}