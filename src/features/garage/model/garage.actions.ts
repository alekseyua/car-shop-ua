import { Modification } from "../../vehicleFilters/model/vehicle.type";
import { useGarageStore } from "./garage.store";

export const handleAddToGarage = (obj: Modification, garageId?: number) => {
    const {addCarToGarage} = useGarageStore.getState();
    addCarToGarage(obj, garageId);
}