'use client'

import React, { useEffect, useState } from 'react'
import { useVehicleFiltersStore } from '../model/vehicle.store'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import iconVehicle from '../../../shared/assets/icons/iconVehicle.svg';
import iconVehicleSelect from '../../../shared/assets/icons/iconVehicleSelect.svg';
import useModal from '@/src/hooks/use-modal';
import { useGarageStore } from '../../garage/model/garage.store';
import SearchButton from '../../search/ui/SearchButton';

interface IProps {
  garageId?: number;
}
const VehicleFilters = ({garageId}: IProps) => {
  const useFilters = useVehicleFiltersStore();
  const { filters, activeModification } = useFilters;
  const { countGarage } = useGarageStore();
  const t = useTranslations("vehicle");
  const {openModal} = useModal();
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    if (filters.brands.length === 0) {
      useFilters.init();
    }
  }, [filters.brands.length, useFilters]);

  return (
    <div className="flex flex-1 items-center justify-start pl-2 gap-2">
      {/* кнопка меню */}
      <button
        type="button"
        onClick={() => {
          // setIsOpen(!isOpen)
          openModal({ type: "accessories-menu", visible: "left" });
        }}
        className="flex h-[50px] w-[50px] flex-col items-center justify-center rounded-md hover:bg-[#e9e9e9]"
      >
        {isOpen ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="mt-[2px] text-[9px] leading-[10px]">Close</span>
          </>
        ) : (
          <>
            <div className="flex w-[14px] flex-col gap-[2px]">
              <span className="h-[1.5px] bg-[#333]" />
              <span className="h-[1.5px] bg-[#333]" />
              <span className="h-[1.5px] bg-[#333]" />
            </div>
            <span className="mt-[2px] text-[9px] leading-[10px]">Menu</span>
          </>
        )}
      </button>
      {/* кнопка выбора автомобиля */}
      <button
        className=" 
                    flex flex-1 items-center justify-start truncate rounded-md 
                    border-gray-200 px-3 py-3 max-h-[50px] min-w-[170px] max-w-[170px]
                    hover:bg-gray-900/[0.04] hover:opacity-100 hover:cursor-pointer
                    "
        onClick={() =>
          !!countGarage
            ? openModal({ type: "vehicle-list", visible: "right" })
            : openModal({ type: "vehicle", visible: "right" })
        }
      >
        <div>

        <Image
          src={activeModification?.name ? iconVehicleSelect : iconVehicle}
          alt="icon vehicle car"
          width={15}
          height={15}
          className="w-[15px] h-[15px] mr-2"
          />
          </div>
        <div>
          {activeModification?.name ? (
            <div className="flex flex-col">
              <span className="text-start ml-2 text-sm min-w-[150px] max-w-[150px] truncate">
                {activeModification?.brand + " " + activeModification?.name}
              </span>
            </div>
          ) : (
            t("addVehicle") + " >"
          )}
          {/* <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-md bg-gray-900/[0.04] opacity-0 transition-opacity duration-150 group-hover/row:opacity-100"></span> */}
        </div>
      </button>
      {/* пошук */}
      <SearchButton />
    </div>
  );
}

export default VehicleFilters;