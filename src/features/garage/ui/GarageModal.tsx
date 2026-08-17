'use client';

import React, { useState } from 'react'
import { useGarageStore } from '../model/garage.store';
import { ModificationGarage, ResponseGarage, ResponseGarageCar } from '../model/garage.types';
import IconEdit from '../../../shared/assets/icons/edit.svg';
import IconDelete from '../../../shared/assets/icons/delete.svg';
import Image from 'next/image';
import FormGarage from '@/src/shared/ui/garage/formGarage';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import useModal from '@/src/hooks/use-modal';
import { useVehicleFiltersStore } from '../../vehicleFilters/model/vehicle.store';
import VehicleCard from './VehicleCard';

const GarageModal = () => {
    const t = useTranslations("garage");

    const router = useRouter();
    const {closeModal, openModal} = useModal();
    const {
      getCatalogByModificationAutotechId,
      activeModification,
      resetActiveModification,
    } = useVehicleFiltersStore();
    const {
      listGarages,
      createGarage,
      errorMessageGarage,
      clearErrorMessageGarage,
      removeFromGarage,
      editItemGarage,
      changeDefaultGarage,
    } = useGarageStore();
    // const [currentGarage, setCurrentGarage] = useState<ResponseGarage | null>(null);
    const [selectedGarage, setSelectedGarage] = useState<ResponseGarage | null>(
      null,
    );
    const [isAddGarage, setIsAddGarage] = useState<boolean>(false);
    const [isEditGarage, setIsEditGarage] = useState<number | null>(null);
    const [dataGarage, setDataGarage] = useState<{name: string, comment?:string} | null>(null);
    const [dataEditGarage, setDataEditGarage] = useState<{name: string, comment?:string} | null>(null);
    const currentGarage = selectedGarage ?? listGarages[0] ?? null;
    
    const handleSelectActiveGarage = (garageId: number) => {
        changeDefaultGarage(garageId);
        const garage = listGarages.find((g) => g.id === garageId);
        setSelectedGarage(garage ?? null);
    }
    
    const handleAddGarage = () => {
        setIsAddGarage(true);
    }

    const handleDataCreateGarage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDataGarage(s=>({
            ...s,
            [name]:value
        }))
    }
    const handleDataEditGarage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDataEditGarage(s=>({
            ...s,
            [name]:value
        }))
    }

    const handleApplyGarage = async () => {
        if (!dataGarage) return;
        if (!dataGarage.name) return;
        const res = await createGarage(dataGarage.name, dataGarage?.comment);
        if(res){
            handleCancelAddGarage();
        }
    }
    const handleApplyEditGarage = async (garageId: number) => {
        if (!dataEditGarage) return;
        if (!dataEditGarage.name) return;
        const res = await editItemGarage(garageId, dataEditGarage?.name, dataEditGarage?.comment);
        if(res){
            handleCancelAddGarage();
        }
    }

    const handleCancelAddGarage = () => {
        setIsAddGarage(false);
        setDataGarage(null);
        setDataEditGarage(null);
        setIsEditGarage(null);
        clearErrorMessageGarage();
    }

    const selectCarFromGarage = (modification: ModificationGarage) => {
        getCatalogByModificationAutotechId(modification)
        router.push("/");
        closeModal();
    }

    const handleAddCarToGarage = () => {
        openModal({type: "vehicle", visible: "right"});
    }

    const removeCarFromGarage = (id: number) => {}

console.log({ activeModification });
  return (
    <div className="h-full">
      <h2 className="font-bold text-lg text-center">{t("title")}</h2>
      <div className="grid grid-cols-2 h-[600px] min-h-0 overflow-hidden">
        <div className="flex w-full p-1.5 flex-col min-h-0 overflow-y-auto">
          {!!listGarages?.length &&
            listGarages.map((g) => (
              <div
                key={g.id}
                className={`flex flex-col border-b hover:cursor-pointer rounded-md p-3 min-w-xl ${currentGarage?.id === g.id ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                onClick={() => handleSelectActiveGarage(g.id)}
              >
                <div className="flex justify-between">
                  <div className="felx flex-col">
                    <p className="text-base font-black text-black">{g.name}</p>
                    <p className="text-sm text-gray-500">{g?.comment ?? "."}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={IconEdit}
                      alt="edit"
                      width={24}
                      height={24}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      onClick={() => {
                        setIsEditGarage(g.id);
                        setDataEditGarage({
                          name: g.name,
                          comment: g?.comment ?? "",
                        });
                      }}
                    />
                    <Image
                      src={IconDelete}
                      alt="edit"
                      width={24}
                      height={24}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      onClick={() => removeFromGarage(g.id)}
                    />
                  </div>
                </div>
                {isEditGarage === g.id && (
                  <FormGarage
                    edit
                    handlerCancel={handleCancelAddGarage}
                    handleInput={handleDataEditGarage}
                    error={errorMessageGarage}
                    handleApply={handleApplyEditGarage.bind(null, g.id)}
                    values={{
                      name: dataEditGarage?.name ?? "",
                      comment: dataEditGarage?.comment ?? "",
                    }}
                  />
                )}
              </div>
            ))}
          {isAddGarage ? (
            <FormGarage
              handlerCancel={handleCancelAddGarage}
              handleInput={handleDataCreateGarage}
              error={errorMessageGarage}
              handleApply={handleApplyGarage}
              values={dataGarage}
            />
          ) : (
            <div className="flex flex-col w-full mt-5">
              <button
                className="
                        p-2
                        w-full                     
                        self-end 
                        flex 
                        items-center 
                        justify-center 
                        rounded-md
                        border
                        text-gray-900 
                        hover:cursor-pointer"
                onClick={handleAddGarage}
              >
                + {t("add-garage")}
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full p-1.5 gap-3 min-h-0 overflow-y-auto">
          {currentGarage?.cars?.length ? (
            currentGarage?.cars.map((gc: ResponseGarageCar) => (
              <VehicleCard
                key={gc.id}
                isActive={gc.modification?.id === activeModification?.id}
                year={gc.modification?.typeRange}
                make={gc.modification.brand}
                model={gc.modification?.model}
                engine={gc.modification?.typeName}
                onDelete={() => {
                  removeCarFromGarage(gc.id);
                }}
                onSelect={() => selectCarFromGarage(gc.modification)}
              />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              В гараже пока нет автомобилей.
            </div>
          )}
          <div
            className="text-right mt-4 underline text-gray-500 
                        hover:cursor-pointer hover:text-gray-900"
            onClick={() => {
              resetActiveModification();
              closeModal();
            }}
          >
            {t("shop-without-vehicle")}
          </div>
          <div className="flex flex-col w-full mt-5 shrink-0">
            <button
              className="
                        p-2
                        w-full                     
                        self-end 
                        flex 
                        items-center 
                        justify-center 
                        rounded-md
                        border
                        text-gray-900 
                        hover:cursor-pointer"
              onClick={handleAddCarToGarage}
            >
              + {t("add-vehicle")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GarageModal