import { useVehicleFiltersStore } from "../../vehicleFilters/model/vehicle.store";
import { Modification } from "../../vehicleFilters/model/vehicle.type";
import { useGarageStore } from "./garage.store";

export const handleAddToGarage = async (obj: Modification, garageId?: number): Promise<boolean> => {
    const {addCarToGarage} = useGarageStore.getState();
    const { resetFilters } = useVehicleFiltersStore.getState();
    const response = await addCarToGarage(obj, garageId);
    if(response){
        resetFilters();
    }
    return response;
}