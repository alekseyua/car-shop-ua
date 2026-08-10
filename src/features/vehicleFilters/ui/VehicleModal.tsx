import { useTranslations } from 'next-intl'
import Image from 'next/image';
import iconCarSearch from '../../../shared/assets/icons/iconCarSearch.svg';
import iconVin from '../../../shared/assets/icons/iconVin.svg';
import iconBack from '../../../shared/assets/icons/iconBack.svg';
import iconSearch from '../../../shared/assets/icons/iconSearch.svg';
import React, { useState } from 'react'
import { useVehicleFiltersStore } from '../model/vehicle.store';

const VehicleModal = () => {
  const t = useTranslations('vehicle');
  const [activeMenu, setActiveMenu] = useState<'make' | 'vin' | null>(null);
  const [activeType, setActiveType] = useState<string>('make');
  const [activeTypeTitle, setActiveTypetitle] = useState<string>(t('make/model.make'));
    const useFilters = useVehicleFiltersStore();
  const { filters, setFilters, setBrand, setModel, setModification } = useFilters;

  const [selected, setSelected] = useState()
  const [search, setSearch] = useState('')

  const listMenuAddVehicle = [
    {
      id: 1,
      title: "listMenuAddVehicle.mark/model",
      desc: "listMenuAddVehicle.descMark/model",
      img: iconCarSearch,
      action: 'make'
    },
    {
      id: 2,
      title: 'listMenuAddVehicle.VIN',
      desc: 'listMenuAddVehicle.descVIN',
      img: iconVin,
      action: 'vin'
    }

  ]
  const listModification = [
    // {
    //   id: 0,
    //   title: 'make/model.year',
    //   type: 'year',
    //   optional: false,
    // },
    {
      id: 1,
      title: 'make/model.make',
      type: 'make',
      optional: false,
    },
    {
      id: 2,
      title: 'make/model.model',
      type: 'model',
      optional: false,
    },
    {
      id: 3,
      title: 'make/model.sub-model',
      type: 'sub-model',
      optional: true,
    },
    // {
    //   id: 4,
    //   title: 'make/model.engine',
    //   type: 'engine',
    //   optional: true,
    // },
  ]
  const nameVehicleMenu = {
    "year": "make/model.year",
    "make": "make/model.make",
    "model": "make/model.model",
    "sub-model": "",
    "": "",
  }
  if(activeMenu === 'make') {
    return (
      <div>
        {/* заголовок розділу  */}
      <div className='grid grid-cols-[25px_1fr]'>
        <button>
          <Image 
            src={iconBack}
            alt='icon-back'
            width={25}
            height={25}
            className='w-[25px] h-[25px]'
            onClick={()=> setActiveMenu(null)}
          />
        </button>
        {/* назва розділу */}
        <div className='flex justify-center'>
            <h3 className='text-lg font-bold'>{t('make/model.title', { part: activeTypeTitle })} </h3>
        </div>
      </div>
        {/* горізонтальне меню */}
        <div className="grid grid-cols-5">
          {listModification.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`
        relative flex flex-col items-center justify-center
        px-2 py-2 text-sm
        
        ${activeType === item.type ? 'text-black font-bold' : 'text-gray-500 hover:cursor-pointer'}
      `}
              onClick={() => {
                setActiveType(item.type);
                setActiveTypetitle(t('make/model.' + item.type));
              }}
            >
              {item.optional && (
                <span className="text-[9px] text-gray-400">
                  Optional
                </span>
              )}

              <span>{t(item.title)}</span>

              {activeType === item.type && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />
              )}
            </button>
          ))}
        </div>

          <div className="w-full bg-white">
            {/* Search */}
            <div className="p-2">
              <div className="flex h-9 items-center gap-3 rounded-sm bg-[#f2f2f2] px-3">
              <Image 
                src={iconSearch}
                alt='icon search'
                className="h-4 w-4 text-black" 
              />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type to narrow down your search."
                  className="
                            w-full
                            bg-transparent
                            text-xs
                            outline-none
                            placeholder:text-gray-500
                          "
                />
              </div>
            </div>
          {/* вибір року */}
          
          {activeType === 'year' &&  <div className="max-h-[230px] overflow-y-auto">
              {filters.years.filter(el => search !== ''? (el+'').includes(search) : el).map((year) => {
                const isSelected = filters.year === year

                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      setFilters({ ...filters, year: year })
                      setActiveType('make');
                      setSearch('');
                      setActiveTypetitle(t('make/model.make'));
                    }}
                    className="
                              flex
                              h-[34px] w-full
                              items-center
                              px-6
                              text-left text-xs
                              transition-colors
                              hover:bg-gray-50 hover:cursor-pointer
                            "
                  >
                    <span className="w-5">
                      {isSelected && (
                        <span className="text-orange-500">✓</span>
                      )}
                    </span>

                    <span
                      className={
                        isSelected
                          ? 'font-semibold text-gray-700'
                          : 'text-gray-600'
                      }
                    >
                      {year}
                    </span>
                  </button>
                )
              })}
            </div>}

          {activeType === 'make' &&  
            <div className="max-h-[230px] overflow-y-auto">
              {filters.brands.filter(el => search !== '' ? ((el.name + '').toUpperCase()).includes(search.toUpperCase()) : el).map((item) => {
                const isSelected = filters.brand?.id === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      // setFilters({ ...filters, brand: item })
                      setBrand(item)
                      setActiveType('model');
                      setSearch('');
                      setActiveTypetitle(t('make/model.model'));
                    }}
                    className="
                              flex
                              h-[34px] w-full
                              items-center
                              px-6
                              text-left text-xs
                              transition-colors
                              hover:bg-gray-50 hover:cursor-pointer
                            "
                  >
                    <span className="w-5">
                      {isSelected && (
                        <span className="text-orange-500">✓</span>
                      )}
                    </span>

                    <span
                      className={
                        isSelected
                          ? 'font-semibold text-gray-700'
                          : 'text-gray-600'
                      }
                    >
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          }
          {activeType === 'model' &&  
            <div className="max-h-[230px] overflow-y-auto">
              {filters.models.filter(el => search !== '' ? ((el.name + '').toUpperCase()).includes(search.toUpperCase()) : el).map((item) => {
                const isSelected = filters.model?.id === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setModel(item);
                      setActiveType('sub-model');
                      setSearch('');
                      setActiveTypetitle(t('make/model.sub-model'));
                    }}
                    className="
                              flex
                              h-[34px] w-full
                              items-center
                              px-6
                              text-left text-xs
                              transition-colors
                              hover:bg-gray-50 hover:cursor-pointer
                            "
                  >
                    <span className="w-5">
                      {isSelected && (
                        <span className="text-orange-500">✓</span>
                      )}
                    </span>

                    <span
                      className={
                        isSelected
                          ? 'font-semibold text-gray-700'
                          : 'text-gray-600'
                      }
                    >
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          }
          {activeType === 'sub-model' &&  
            <div className="max-h-[230px] overflow-y-auto">
              {filters.modifications.filter(el => search !== '' ? ((el.name + '').toUpperCase()).includes(search.toUpperCase()) : el).map((item) => {
                const isSelected = filters.modification?.id === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setModification(item);
                      // setActiveType('sub-model');
                      setSearch('');
                      // setActiveTypetitle(t('make/model.sub-model'));
                    }}
                    className="
                              flex
                              h-[34px] w-full
                              items-center
                              px-6
                              text-left text-xs
                              transition-colors
                              hover:bg-gray-50 hover:cursor-pointer
                            "
                  >
                    <span className="w-5">
                      {isSelected && (
                        <span className="text-orange-500">✓</span>
                      )}
                    </span>

                    <span
                      className={
                        isSelected
                          ? 'font-semibold text-gray-700'
                          : 'text-gray-600'
                      }
                    >
                      {item.name}
                    </span>
                  </button>
                )
              })}
            </div>
          }
          {activeType === 'engine' &&  
            <div className="max-h-[230px] overflow-y-auto">

            </div>
          }
          </div>
        {/* вибір бренду */}
        {/* вибір моделі */}
        {/* вибір покоління */}
      </div>
    )
  }
  return (
    <div className='felx flex-col gap-2'>
      <h2 className='font-bold text-lg'>{t('addNewVehicle')}</h2>
      <p>{t('descAddNewVehicle')}</p>
      <div className='flex flex-col gap-3'>

      {
        listMenuAddVehicle.map( (lm, i: number)=>(
          <div key={lm.id} className='grid grid-cols-[60px_1fr] bg-[#f2f2f2] p-4 items-center rounded-md
                                      hover:cursor-pointer hover:opacity-80 hover:box-shadow-md'
            onClick={()=>setActiveMenu(lm.action as 'make' | 'vin')}
          >
            <div>
              <Image src={lm.img} alt={'icon-menu'+i} width={50} height={50} className='w-[50px] h-[50px]' />
            </div>
            <div className='flex flex-col'>
              <h3 className='font-bold text-lg'>{t(lm.title)}</h3>
              <p className='text-sm'>{t(lm.desc)}</p>
            </div>
            </div>
        ))
      }
      </div>
    </div>
  )
}

export default VehicleModal