import { Catalog } from "../../../features/vehicleFilters/model/vehicle.type";
import { TransformCatalog } from "./types";

export const transformCatalog = (catalog: Catalog[]): TransformCatalog => {
    const transformedCatalog = catalog.reduce((acc: TransformCatalog, item: Catalog ) => {
        if(acc[item.groupCode] == null){
            acc[item.groupCode] = [];
        }
        acc[item.groupCode].push(item);
        return acc;
    }, {} as TransformCatalog)
    return transformedCatalog;
}