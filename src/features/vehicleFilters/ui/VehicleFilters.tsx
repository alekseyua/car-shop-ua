'use client'

import React, { useEffect, useState } from 'react'
import { useVehicleFiltersStore } from '../model/vehicle.store'
import { useTranslations } from 'next-intl';
import { Modification } from '../model/vehicle.type';
import { ArrowUp } from '@/src/shared/ui/arrows/ArrowUp';
import Image from 'next/image';
import { handleAddToGarage } from '../../garage/model/garage.actions';

interface IProps {
  garageId?: number;
}
const VehicleFilters = ({garageId}: IProps) => {
  const useFilters = useVehicleFiltersStore();
  const [locked, setLocked] = useState(false);
  const { filters, setFilters, setBrand, setModel, setModification } = useFilters;
  const t = useTranslations("HomePage");

  useEffect(() => {
    if (filters.brands.length === 0) {
      useFilters.init();
    }
  }, []);

  if (filters.brand?.name && filters.model?.name && filters.modification?.name) {
    return (
      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <div className='flex p-2 border rounded-md bg-[#e7e7e7]'>
            <Image src={filters.modification.image || 'https://leoparts.com.ua/assets/leoparts/attachments/car_small/cd7dfaf9447fa1013c5f78027ccbba6e.jpg'} alt={filters.modification.name} width={200} height={100} className='object-contain' />
          </div>
          <div className="flex flex-col gap-1">
            <span className='text-[17px] font-medium  text-black'>{filters.brand?.name + ' ' + filters.modification.name}</span>
            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.range')} : {filters.modification?.range}</span>
            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.engineType')} : {filters.modification?.engineType}</span>
            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.kw')} : {filters.modification?.kw}</span>
            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.hp')} : {filters.modification?.hp}</span>
            <span className="font-medium mr-3 text-black">{t('FiltersVehicle.infoModification.bodyType')} : {filters.modification?.bodyType}</span>
          <div className="font-medium mr-3 text-black">
            <button
              onClick={() => filters.modification && handleAddToGarage(filters.modification, garageId)}
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
                        transition
                        duration-300
                        hover:shadow-md
                        hover:cursor-pointer"
            >
              add to garage
            </button>
          </div>
          </div>
        </div>
        
      </div>
    )
  }

  return (
    <div>
      <span className="text-3xl font-bold text-black">
        {t('FiltersVehicle.year.title')}
      </span>
      <div className="flex gap-4" >
        {/* Year Filter */}
        <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${locked ? 'pointer-events-none' : ''
          }`}
          onMouseLeave={() => setLocked(false)}
        >
          <span className='text-[17px] font-medium  text-white'>{filters.year || t('FiltersVehicle.year.label')}</span>

          <div className="absolute gap-2 pt-5 left-0 top-[43px] z-10 hidden group-hover:flex bg-white border border-[#ed1c24]">
            <ArrowUp />
            <HideLineBox />
            {filters.years.map((year) => (
              <div key={year.decade} className="px-4 py-2 text-black ">
                <span className="font-semibold opacity-50">{year.decade}s</span>
                <div className="opacity-none">
                  {year.years.map((y) => (
                    <span
                      key={y}
                      className="block cursor-pointer px-1 text-[#1a66ff] hover:text-black"
                      onClick={() => {
                        setFilters({ ...filters, year: y });
                        setLocked(true);
                      }}
                    >{y}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Brand Filter */}
        <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${locked ? 'pointer-events-none' : ''
          }`}
          onMouseLeave={() => setLocked(false)}
        >
          <span className='text-[17px] font-medium  text-white'>{filters.brand?.name || t('FiltersVehicle.brand.label')}</span>

          <div className="absolute pt-5 left-0 top-[43px] z-10 hidden group-hover:grid grid-cols-6 gap-1 bg-white border border-[#ed1c24] w-max">
            <ArrowUp />
            <HideLineBox />
            {filters.brands.map((brand) => (
              <div key={brand.id + '_brand'} className="px-2 h-[30] py-1 text-xs text-[#1a66ff] cursor-pointer hover:text-black transition-colors duration-300"
                onClick={() => {
                  setBrand({ id: brand.id, name: brand.name });
                  setLocked(true);
                }}
              >
                <span className="font-semibold p-1">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Model Filter */}
        <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${locked ? 'pointer-events-none' : ''
          }`}
          onMouseLeave={() => setLocked(false)}
        >
          <span className='text-[17px] font-medium  text-white'>{filters.model?.name || t('FiltersVehicle.model.label')}</span>

          {filters.brand?.name && <div className="absolute left-0  pt-5 
            top-[43px] z-10 hidden group-hover:grid 
            grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            gap-1 bg-white border border-[#ed1c24] w-max">
            <ArrowUp />
            <HideLineBox />

            {filters.models.map((model) => (
              <div key={model.id + '_model'} className="px-4 py-1 text-sm text-[#1a66ff] cursor-pointer  hover:text-black transition-colors duration-300"
                onClick={() => {
                  setModel({ id: model.id, name: model.name });
                  setLocked(true);
                }}
              >
                <span className="font-semibold">{model.name}</span>
              </div>
            ))}
          </div>}
        </div>
        {/* Modification Filter */}
        <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${locked ? 'pointer-events-none' : ''
          }`}
          onMouseLeave={() => setLocked(false)}
        >
          <span className='text-[17px] font-medium  text-white'>{filters.modification?.name || t('FiltersVehicle.modification.label')}</span>

          {filters.model?.name && <div className="absolute P-2  pt-5 gap-1 left-0 top-[43px] z-10 hidden group-hover:flex group-hover:flex-col bg-white border border-[#ed1c24] w-max">
            <ArrowUp />
            <HideLineBox />

            {filters.modifications.map((modification: Modification) => (
              <div key={modification.id} className="px-4 py-2 text-[#1a66ff] cursor-pointer hover:text-black transition-colors duration-300 w-[600px]"
                onClick={() => {
                  setModification({ ...modification });
                  setLocked(true);
                }}
              >
                <span className="font-semibold mr-3" >{modification.name}</span>
                <span className="font-semibold mr-3">{modification.range}</span>
                <span className="font-semibold mr-3">{modification.engineType}</span>
                <span className="font-semibold mr-3">{modification.kw}</span>
                <span className="font-semibold mr-3">{modification.hp}</span>
                <span className="font-semibold mr-3">{modification.bodyType}</span>
              </div>
            ))}
          </div>}
        </div>
      </div>

    </div>
  )
}

export default VehicleFilters;

const HideLineBox = () => (<div className="absolute -top-[2px] -left-[2px] w-[calc(100%+4px)] h-[15px] bg-[#f2f4f3] border-b border-b-[#ed1c24]"></div>)