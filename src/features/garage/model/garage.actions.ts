import { Modification } from "../../vehicleFilters/model/type";
import { useGarageStore } from "./garage.store";

export const handleAddToGarage = (obj: Modification) => {
    const {addToGarage} = useGarageStore.getState();
    addToGarage(obj);
}