import React, { useEffect, useState } from 'react'
import { useVehicleFiltersStore } from '../model/store'
import { useTranslations } from 'next-intl';

const VehicleFilters = () => {
  const useFilters = useVehicleFiltersStore();
  const [locked, setLocked] = useState(false);
  const { filters, setFilters, setBrand, setModel, setTypeBody } = useFilters;
  const t = useTranslations("HomePage");
  useEffect(() => {
    useFilters.init();
  }, []);
console.log('Current filters state:', filters);
  return (
    <div className="flex gap-4" >
      {/* Year Filter */}
      <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${
        locked ? 'pointer-events-none' : ''
      }`}
        onMouseLeave={() => setLocked(false)}
      >
        <span className='text-[17px] font-medium  text-white'>{filters.year || t('FiltersVehicle.year.label')}</span>
        
        <div className="absolute gap-2 left-0 top-full z-10 hidden group-hover:flex bg-white border border-[#ed1c24]">
          {filters.years.map((year) => (
            <div key={year.decade} className="px-4 py-2 text-black ">
              <span className="font-semibold opacity-50">{year.decade}s</span>
              <div className="opacity-none">
                {year.years.map((y) => (
                  <span 
                    key={y} 
                    className="block cursor-pointer px-1 text-[#1a66ff] hover:bg-[#c71515] transition-colors duration-300"
                    onClick={()=>{
                      setFilters({...filters, year: y});
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
      <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${
        locked ? 'pointer-events-none' : ''
      }`}
        onMouseLeave={() => setLocked(false)}
      >
        <span className='text-[17px] font-medium  text-white'>{filters.brand?.name || t('FiltersVehicle.brand.label')}</span>
        
        <div className="absolute gap-2 left-0 top-full z-10 hidden group-hover:flex bg-white border border-[#ed1c24]">
          {filters.brands.map((brand) => (
            <div key={brand.id} className="px-4 py-2 text-black cursor-pointer hover:text-[#ff0000] transition-colors duration-300" 
              onClick={() => {
                setBrand({ id: brand.id, name: brand.name});
                setLocked(true);
              }}
            >
              <span className="font-semibold text-[#1a66ff]">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Model Filter */}
      <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${
        locked ? 'pointer-events-none' : ''
      }`}
        onMouseLeave={() => setLocked(false)}
      >
        <span className='text-[17px] font-medium  text-white'>{filters.model || t('FiltersVehicle.model.label')}</span>
        
        <div className="absolute gap-2 left-0 top-full z-10 hidden group-hover:flex bg-white border border-[#ed1c24]">
          {filters.models.map((model) => (
            <div key={model.id} className="px-4 py-2 text-black cursor-pointer hover:text-[#ff0000] transition-colors duration-300" 
              onClick={() => {
                setModel({ id: model.id, name: model.name });
                setLocked(true);
              }}
            >
              <span className="font-semibold text-[#1a66ff]">{model.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* typeBody Filter */}
      <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${
        locked ? 'pointer-events-none' : ''
      }`}
        onMouseLeave={() => setLocked(false)}
      >
        <span className='text-[17px] font-medium  text-white'>{filters.typeBody || t('FiltersVehicle.typeBody.label')}</span>
        
        <div className="absolute gap-2 left-0 top-full z-10 hidden group-hover:flex bg-white border border-[#ed1c24]">
          {filters.typeBodys.map((typeBody) => (
            <div key={typeBody.id} className="px-4 py-2 text-black cursor-pointer hover:text-[#ff0000] transition-colors duration-300" 
              onClick={() => {
                setTypeBody({ id: typeBody.id, name: typeBody.name });
                setLocked(true);
              }}
            >
              <span className="font-semibold text-[#1a66ff]">{typeBody.name}</span>
            </div>
          ))}
        </div>
      </div>
        {/* Generation Filter */}
      {/* <div className={`group relative flex p-2 border rounded-md bg-[#ed1c24] ${locked ? 'pointer-events-none' : ''
        }`}
        onMouseLeave={() => setLocked(false)}
      >
        <span className='text-[17px] font-medium  text-white'>{filters.generation || t('FiltersVehicle.generation.label')}</span>

        <div className="absolute gap-2 left-0 top-full z-10 hidden group-hover:flex bg-white border border-[#ed1c24]">
          {filters.generations.map((generation) => (
            <div key={generation.id} className="px-4 py-2 text-black cursor-pointer hover:text-[#ff0000] transition-colors duration-300"
              onClick={() => {
                setGeneration(generation.id);
                setLocked(true);
              }}
            >
              <span className="font-semibold text-[#1a66ff]">{generation.name}</span>
            </div>
          ))}
        </div>
      </div> */}

    </div>
  )
}

export default VehicleFilters