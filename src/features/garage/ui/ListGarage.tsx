import React from "react";
import { useGarageStore } from "../model/garage.store";
import { ResponseGarageCar } from "../model/garage.types";
import { useVehicleFiltersStore } from "../../vehicleFilters/model/vehicle.store";
import useModal from "@/src/hooks/use-modal";
import { useTranslations } from "next-intl";
import { Modification } from "../../vehicleFilters/model/vehicle.type";
import { useRouter } from "@/src/i18n/navigation";
import VehicleCardGarage from "./VehicleCardGarage";
import Loading from "@/src/shared/ui/loading/Loading";

const ListGarage = () => {
  const { listGarages, removeCarFromGarage, loadingCarGarage } =
    useGarageStore();
  const {
    getCatalogByModificationAutotechId,
    activeModification,
    isLoadingCurrentModification,
  } = useVehicleFiltersStore();
  const { closeModal, openModal } = useModal();
  const route = useRouter();
  const t = useTranslations("vehicle");

  const currentGarage = listGarages[0] ?? null;

  const selectCarFromGarage = async (modification: Modification) => {
    const isSetModification = await getCatalogByModificationAutotechId(modification);
    if(isSetModification){
      route.push("/catalog");
      closeModal();
    };
  };
  
  const handleDeleteCardGarage = (e: React.MouseEvent<HTMLButtonElement>,id: number) => {
    e.stopPropagation();
    removeCarFromGarage(id);
   
  };

  return (
    <div className="felx flex-col h-full min-h-0">
      <div className="flex flex-col h-full">
        <h2 className="font-bold text-lg text-center">
          {t("choose-new-vehicle")}
        </h2>
        <div className="relative flex flex-col min-h-0 flex-1 gap-4">
          {loadingCarGarage && (
            <div className="absolute w-full h-full bg-gray-900/20 z-999 flex items-center justify-center">
              <Loading />
            </div>
          )}
          {isLoadingCurrentModification && (
            <div className="absolute w-full h-full bg-gray-900/20 z-999 flex items-center justify-center">
              <Loading />
            </div>
          )}
          {currentGarage?.cars?.length ? (
            currentGarage?.cars.map((gc: ResponseGarageCar) => (
              <VehicleCardGarage
                key={gc.id}
                isActive={activeModification?.id === gc.modification?.id}
                year={gc.modification.range}
                make={gc.modification.brand}
                model={gc.modification?.model}
                engine={gc.modification?.engineType}
                onSelect={() => selectCarFromGarage(gc.modification)}
                onDelete={(e) => handleDeleteCardGarage(e, gc.id)}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              В гараже пока нет автомобилей.
            </div>
          )}
        </div>

        <div className="flex w-full gap-8 rounded-b-lg bg-white">
          <button
            type="button"
            className="
                    shrink-0
                    flex flex-1 items-center justify-center
                    rounded-lg border-2 border-[#292929]
                    bg-white px-2 py-4
                    text-[14px] font-condensed font-semibold uppercase
                    text-[#292929]
                    transition-colors duration-200
                    hover:bg-[#f5f5f5]
                    active:bg-[#eaeaea]
                    "
            onClick={() => openModal({ type: "garage" })}
          >
            Manage Vehicles
          </button>

          <button
            type="button"
            className="
      flex flex-1 items-center justify-center
      rounded-lg
      bg-[#242526] px-6 py-4
      text-[14px] font-condensed font-semibold uppercase
      text-white
      transition-colors duration-200
      hover:bg-[#303132]
      active:bg-[#191a1b]
    "
            onClick={() => openModal({ type: "vehicle", visible: "right" })}
          >
            Add New Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListGarage;
