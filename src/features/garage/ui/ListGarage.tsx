import React from "react";
import VehicleCard from "./VehicleCard";
import { useGarageStore } from "../model/garage.store";
import { ModificationGarage, ResponseGarageCar } from "../model/garage.types";
import { useVehicleFiltersStore } from "../../vehicleFilters/model/vehicle.store";
import useModal from "@/src/hooks/use-modal";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ListGarage = () => {
  const { listGarages, removeFromGarage } = useGarageStore();
  const { getCatalogByModificationAutotechId, activeModification } =
    useVehicleFiltersStore();
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  const t = useTranslations("vehicle");

  const currentGarage = listGarages[0] ?? null;
  const selectCarFromGarage = (modification: ModificationGarage) => {
    getCatalogByModificationAutotechId(modification);
    router.push("/");
    closeModal();
  };
  
  return (
    <div className="felx flex-col h-full min-h-0">
      <div className="flex flex-col h-full">
        <h2 className="font-bold text-lg text-center">
          {t("choose-new-vehicle")}
        </h2>
        <div className="flex flex-col min-h-0 flex-1 gap-4">
          {currentGarage?.cars?.length ? (
            currentGarage?.cars.map((gc: ResponseGarageCar) => (
              <VehicleCard
                key={gc.id}
                isActive={
                  activeModification?.id === gc.modification?.id
                }
                year={gc.modification?.typeRange}
                make={gc.modification.brand}
                model={gc.modification?.model}
                engine={gc.modification?.typeName}
                onSelect={() => selectCarFromGarage(gc.modification)}
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
