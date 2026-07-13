'use client';

import React, { useEffect, useState } from 'react'
import { useGarageStore } from '../model/garage.store';
import { ModificationGarage, ResponseGarage, ResponseGarageCar } from '../model/garage.types';
import IconEdit from '../../../shared/assets/icons/edit.svg';
import IconDelete from '../../../shared/assets/icons/delete.svg';
import Image from 'next/image';
import FormGarage from '@/src/shared/ui/garage/formGarage';
import VehicleFilters from '../../vehicleFilters/ui/VehicleFilters';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import useModal from '@/src/hooks/use-modal';
import { useVehicleFiltersStore } from '../../vehicleFilters/model/vehicle.store';

const GarageModal = () => {
    const t = useTranslations("HomePage");
    const router = useRouter();
    const {closeModal} = useModal();
    const { getCatalogByModificationAutotechId } = useVehicleFiltersStore();
    const { listGarages, createGarage, errorMessageGarage, clearErrorMessageGarage, removeFromGarage, editItemGarage } = useGarageStore();
    const [currentGarage, setCurrentGarage] = useState<ResponseGarage | null>(null);
    const [isAddGarage, setIsAddGarage] = useState<boolean>(false);
    const [isAddCarGarage, setIsAddCarGarage] = useState<boolean>(false);
    const [isEditGarage, setIsEditGarage] = useState<number | null>(null);
    const [dataGarage, setDataGarage] = useState<{name: string, comment?:string} | null>(null);
    const [dataEditGarage, setDataEditGarage] = useState<{name: string, comment?:string} | null>(null);
    
    const hanleSelectActiveGarage = (garageId: number) => {
        const garage = listGarages.find((g) => g.id === garageId);
        setCurrentGarage(garage ?? null);
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

    useEffect(()=>{
        if (listGarages.length)
            setCurrentGarage(listGarages[0]);
    }, [setCurrentGarage, listGarages])

    if(isAddCarGarage) {
        return (
        <div>
            <div className='flex justify-between mt-4'>
                <h2 className='text-gray-900'>Гараж: {currentGarage?.name}</h2>
                <button className='text-gray-900 hover:cursor-pointer'
                    onClick={() => setIsAddCarGarage(s=>!s)}
                >back</button>
            </div>
            <VehicleFilters garageId={currentGarage?.id}/>
        </div>
    )
    }


  return (
    <div className="grid grid-cols-2">
        <div className="flex w-full p-1.5 flex-col">
              {!!listGarages?.length &&
                  listGarages.map( (g) => (
                    <div key={g.id}
                        className='flex flex-col border-b hover:cursor-pointer min-w-xl' 
                          onClick={() => hanleSelectActiveGarage(g.id)}
                    >
                        <div className='flex justify-between'>
                            <div className="felx flex-col">
                                <p className='text-base font-black text-black'>{g.name}</p>
                                  <p className='text-sm text-gray-500'>{g?.comment ?? '.'}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={IconEdit}
                                    alt="edit"
                                    width={24}
                                    height={24}
                                    style={{
                                        width: 24,
                                        height:24
                                    }}
                                    onClick={() => {
                                        setIsEditGarage(g.id)
                                        setDataEditGarage({
                                            name: g.name,
                                            comment: g?.comment ?? '',
                                        })
                                    }}
                                />
                                <Image
                                    src={IconDelete}
                                    alt="edit"
                                    width={24}
                                    height={24}
                                    style={{
                                        width: 24,
                                        height:24
                                    }}
                                      onClick={() => removeFromGarage(g.id)}
                                />
                            </div>
                        </div>
                        {isEditGarage === g.id && 
                              <FormGarage
                                  edit
                                  handlerCancel={handleCancelAddGarage}
                                  handleInput={handleDataEditGarage}
                                  error={errorMessageGarage}
                                    handleApply={handleApplyEditGarage.bind(null,g.id)}
                                  values={{
                                    name: dataEditGarage?.name ?? '', 
                                    comment: dataEditGarage?.comment ?? ''
                                  }}
                              />
                        }
                    </div>
                  ))
              }
              { isAddGarage ?
                  <FormGarage 
                      handlerCancel={handleCancelAddGarage}
                      handleInput={handleDataCreateGarage}
                      error={errorMessageGarage}
                      handleApply={handleApplyGarage}
                      values={dataGarage}
                  />
                :<div className='flex flex-col w-full mt-5'>
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
                   + add garage
                </button>
              </div>}
        </div>
        <div className="flex flex-col w-full p-1.5 gap-3">

            {
                  !!currentGarage?.cars?.length &&
                  currentGarage?.cars.map((gc: ResponseGarageCar)=>(
                          <div key={gc.id} className="flex flex-col gap-1 border rounded-md p-2 hover:cursor-pointer hover:shadow-md"
                            onClick={()=>selectCarFromGarage(gc.modification)}
                          >
                            <span className='text-[17px] font-medium  text-black'>{gc.modification.model.model}</span>
                            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.range')} : {gc.modification?.model?.range}</span>
                            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.engineType')} : {gc.modification?.engineType.name}</span>
                            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.kw')} : {gc.modification?.kw}</span>
                            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.hp')} : {gc.modification?.hp}</span>
                            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.bodyType')} : {gc.modification?.bodyType.name}</span>
                        </div>
                    ))
            }

              <div className='flex flex-col w-full mt-5'>
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
                        onClick={()=>setIsAddCarGarage(s=>!s)}
                  >
                      + add car
                  </button>
              </div>
        </div>
    </div>
  )
}

export default GarageModal