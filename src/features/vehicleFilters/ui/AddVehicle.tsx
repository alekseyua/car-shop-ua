import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image';
import iconCarSearch from '../../../shared/assets/icons/iconCarSearch.svg';
import iconVin from '../../../shared/assets/icons/iconVin.svg';
import iconBack from '../../../shared/assets/icons/iconBack.svg';
import iconSearch from '../../../shared/assets/icons/iconSearch.svg';
import iconVehicle from '../../../shared/assets/icons/iconVehicle.svg'
import React, { useState } from 'react'
import { useVehicleFiltersStore } from '../model/vehicle.store';
import useModal from '@/src/hooks/use-modal';
import { isYearInRange } from '@/src/shared/libs/helpers';
import Tooltip from '@/src/shared/ui/Tooltip';
import { useVinImage } from '../model/useVinImage';
import { handleAddToGarage } from '../../garage/model/garage.actions';
import { Modification } from '../model/vehicle.type';
import { useRouter } from '@/src/i18n/navigation';


const AddVehicle = () => {
  const t = useTranslations('vehicle');
  const local = useLocale();
  const [activeMenu, setActiveMenu] = useState<'make' | 'vin' | null>(null);
  const [activeType, setActiveType] = useState<string>('year');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activeTypeTitle, setActiveTypeTitle] = useState<string>(t('make/model.year'));
  const { closeModal } = useModal();
  const useFilters = useVehicleFiltersStore();
  const { filters, setFilters, setBrand, setModel, setModification, setActiveModification } = useFilters;
  const getImage = useVinImage();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [vin, setVin] = useState("");
  const handleAddVehicle = () => {
    if (!vin.trim()) return;
    console.log("VIN:", vin);
  };
  const handleClickAddToGarage = async (modification: Modification, garageId?: number) => {
    const response = await handleAddToGarage(modification, garageId);
    setActiveModification(modification);
    closeModal();
    console.log({ response })
    router.push('/');
    // response true когда авторизован и добавлен
    if (response) {
      // cameBack!();
    }
  };

  

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
    {
      id: 0,
      title: 'make/model.year',
      type: 'year',
      optional: false,
    },
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


console.log({filters})
  if (activeMenu === 'make') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-col min-h-0 flex-1">
          {/* заголовок розділу  */}
          <div className="grid grid-cols-[25px_1fr]">
            <button>
              <Image
                src={iconBack}
                alt="icon-back"
                width={25}
                height={25}
                className="w-[25px] h-[25px] hover:cursor-pointer"
                onClick={() => setActiveMenu(null)}
              />
            </button>
            {/* назва розділу */}
            <div className="flex justify-center">
              <h3 className="text-lg font-bold">
                {t("make/model.title", { part: activeTypeTitle })}{" "}
              </h3>
            </div>
          </div>
          {/* інформаційна стрічка з вибраними конфігураціями */}
          <div className="flex justify-center min-h-3 bg-[#f2f2f2] p-3 mt-2">
            <Image
              src={iconVehicle}
              alt="icon show configuration vehicle"
              width={20}
              height={20}
              className="w-[20px] h-[20px] mr-2"
            />
            <span>
              {" "}
              {(filters?.year ?? "") +
                " " +
                (filters.brand?.name ?? "") +
                " " +
                (filters.model?.name ?? "") +
                " " +
                (filters.modification?.name ?? "")}
            </span>
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
          
          ${activeType === item.type ? "text-black font-bold" : "text-gray-500 hover:cursor-pointer"}
        `}
                onClick={() => {
                  setActiveType(item.type);
                  setActiveTypeTitle(t("make/model." + item.type));
                }}
              >
                {item.optional && (
                  <span className="text-[9px] text-gray-400">Optional</span>
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
                  alt="icon search"
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

            {activeType === "year" && (
              <div className="max-h-[230px] overflow-y-auto">
                {filters.years
                  .filter((el) =>
                    search !== "" ? (el + "").includes(search) : el,
                  )
                  .map((year) => {
                    const isSelected = filters.year === year;

                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => {
                          setFilters({ ...filters, year: year });
                          setActiveType("make");
                          setSearch("");
                          setActiveTypeTitle(t("make/model.make"));
                        }}
                        className="
                                flex
                                h-[34px] w-full
                                items-center
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
                              ? "font-semibold text-gray-700"
                              : "text-gray-600"
                          }
                        >
                          {year}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
            {/* вибір бренду */}

            {activeType === "make" && (
              <div className="max-h-[230px] overflow-y-auto">
                {filters.brands
                  .filter((el) =>
                    search !== ""
                      ? (el.name + "")
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      : el,
                  )
                  .map((item) => {
                    const isSelected = filters.brand?.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          // setFilters({ ...filters, brand: item })
                          setBrand(item);
                          setActiveType("model");
                          setSearch("");
                          setActiveTypeTitle(t("make/model.model"));
                        }}
                        className="
                                flex
                                h-[34px] w-full
                                items-center
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
                              ? "font-semibold text-gray-700"
                              : "text-gray-600"
                          }
                        >
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
            {/* вибір моделі */}

            {activeType === "model" && (
              <div className="max-h-[230px] overflow-y-auto">
                {!filters.brand?.id && <div>{t("make/model.notBrand")}</div>}

                {filters.models
                  .filter((el) =>
                    search !== ""
                      ? (el.name + "")
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      : el,
                  )
                  .map((item) => {
                    const isSelected = filters.model?.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setModel(item);
                          setActiveType("sub-model");
                          setSearch("");
                          setActiveTypeTitle(t("make/model.sub-model"));
                        }}
                        className="
                                flex
                                h-[34px] w-full
                                items-center
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
                              ? "font-semibold text-gray-700"
                              : "text-gray-600"
                          }
                        >
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
            {/* вибір покоління */}

            {activeType === "sub-model" && (
              <div className="max-h-[230px] overflow-y-auto">
                {!filters.model && <div>{t("make/model.notModel")}</div>}
                {!!filters.modifications.length && filters.year && (
                  <button
                    className="hover:cursor-pointer hover:opacity-80"
                    onClick={() => setShowAll((s) => !s)}
                  >
                    {t("make/model.show-" + (showAll ? "off" : "on"))}
                  </button>
                )}
                {filters.modifications
                  .filter((el) =>
                    search !== ""
                      ? (el.name + "")
                          .toUpperCase()
                          .includes(search.toUpperCase())
                      : el,
                  )
                  .filter((el) =>
                    filters.year && !showAll
                      ? isYearInRange(filters.year, el.range)
                      : el,
                  )
                  .map((item) => {
                    const isSelected = filters.modification?.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setModification(item);
                          setSearch("");
                        }}
                        className="
                                flex
                                h-[34px] w-full
                                items-center
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
                              ? "font-semibold text-gray-700 mr-3 min-w-[75px] max-w-[75px] truncate"
                              : "text-gray-600 mr-3 min-w-[75px] max-w-[75px] truncate"
                          }
                        >
                          {item.name}
                        </span>
                        <span className="font-semibold mr-3 min-w-[100px] max-w-[100px] truncate">
                          {item.range}
                        </span>
                        <span className="font-semibold mr-3 min-w-[50px] max-w-[50px] truncate">
                          {item.engineType}
                        </span>
                        <span className="font-semibold mr-3 min-w-[20px] max-w-[20px] truncate">
                          {item.kw}
                        </span>
                        <span className="font-semibold mr-3 truncate">
                          {item.bodyType}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        {/* кнопка добавления в гараж */}
        {filters.modification && (
          <div className="flex flex-col items-center justify-center shrink-0">
            <p className="text-md ">{t("shopForPartsThatFit")}</p>
            <p>{`${filters.modification.brand} ${filters.modification.name}`}</p>
            <button
              type="button"
              className="flex flex-1 items-center justify-center truncate rounded-md border 
                              px-3 py-3 w-full bg-[#202124] text-gray-200
                              hover:opacity-80 hover:cursor-pointer
                            "
              onClick={() =>
                filters.modification &&
                handleClickAddToGarage(filters.modification)
              }
            >
              {t("addVehicle")}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (activeMenu === 'vin') {
    return (
      <div>
        {/* заголовок розділу  */}
        <div className='grid grid-cols-[25px_1fr] mb-3'>
          <button>
            <Image
              src={iconBack}
              alt='icon-back'
              width={25}
              height={25}
              className='w-[25px] h-[25px] hover:cursor-pointer'
              onClick={() => setActiveMenu(null)}
            />
          </button>
        </div>

        {/* Add VIN */}
        <section>
          <div className="mb-1 flex items-center gap-1">
            <h3 className='text-lg font-bold'>{t('vin.title')} </h3>
            <Tooltip
              content={
                <div>
                  <div className='text-md font-bold'>{t('vin.info-what-is-it-title')}</div>
                  <div>{t('vin.info-what-is-it-desc')}</div>
                </div>
              }
            >
              <span
                className="flex h-[18px] w-[18px] items-center justify-center 
                rounded-full border-2 border-[#555] text-[13px] 
                font-bold text-[#555]"
              >
                i
              </span>
            </Tooltip>
          </div>

          <p className="mb-[11px] text-[14px] leading-[15px]">
            {t('vin.label')}
          </p>

          <div className="flex gap-[11px]">
            <div className="relative flex-1">
              <input
                id="vin"
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder=" "
                className="
                          peer
                          h-[37px]
                          w-full
                          rounded-[3px]
                          border
                          border-[#aaa]
                          px-[11px]
                          text-[11px]
                          text-[#222]
                          outline-none
                          focus:border-[#555]
                        "
              />

              <label
                htmlFor="vin"
                className="
                      pointer-events-none
                      absolute
                      left-[11px]
                      top-1/2
                      -translate-y-1/2
                      bg-white
                      px-[2px]
                      text-[11px]
                      text-[#777]
                      transition-all
                      duration-200
                      peer-focus:top-0
                      peer-focus:text-[9px]
                      peer-focus:text-[#555]
                      peer-[:not(:placeholder-shown)]:top-0
                      peer-[:not(:placeholder-shown)]:text-[9px]
                    "
              >
                {t('vin.enter-vin')} <span className='text-red-500'>*</span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleAddVehicle}
              disabled={!vin.trim()}
              className="h-[37px] w-[110px] rounded-[3px] bg-[#e6e6e6] text-[9px] font-medium uppercase text-[#777] transition hover:bg-[#ddd] disabled:cursor-not-allowed"
            >
              Add Vehicle
            </button>
          </div>
        </section>

        {/* Where to find VIN */}
        <section className="mt-[49px]">
          <h2 className="mb-[14px] text-[14px] font-medium uppercase leading-[18px]">
            {t('vin.where-to-find-my-vin-title')}
          </h2>

          <h3 className="mb-[11px] text-[9px] font-bold">
            {t('vin.where-to-find-my-vin-desc-location')}
          </h3>

          {/* VIN diagram */}
          <div className="relative h-[224px] w-full">
            <Image
              src={getImage.getImageByLangCode(local)}
              alt="Common VIN locations"
              className="h-full w-full object-contain object-left"
            />
          </div>
        </section>

        {/* Additional information */}
        <section className="mt-[12px]">
          <h3 className="mb-[12px] text-[9px] font-bold">
            {t('vin.where-to-find-my-vin-desc-title')}
          </h3>

          <p className="max-w-[360px] text-[11px] leading-[15px] text-[#333]">
            {t('vin.where-to-find-my-vin-desc')}
          </p>
        </section>
      </div>
    )
  }

  // first menu add vehicle
  return (
    <div className='felx flex-col gap-2'>
      <h2 className='font-bold text-lg'>{t('addNewVehicle')}</h2>
      <p>{t('descAddNewVehicle')}</p>
      <div className='flex flex-col gap-3'>

        {
          listMenuAddVehicle.map((lm, i: number) => (
            <div key={lm.id} className='grid grid-cols-[60px_1fr] bg-[#f2f2f2] p-4 items-center rounded-md
                                      hover:cursor-pointer hover:opacity-80 hover:box-shadow-md'
              onClick={() => setActiveMenu(lm.action as 'make' | 'vin')}
            >
              <div>
                <Image src={lm.img} alt={'icon-menu' + i} width={50} height={50} className='w-[50px] h-[50px]' />
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

export default AddVehicle