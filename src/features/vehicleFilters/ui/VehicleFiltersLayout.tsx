"use client";

import React, { useEffect } from "react";
import { useVehicleFiltersStore } from "../model/vehicle.store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import iconAccessories from "../../../shared/assets/icons/iconAccessories.svg";
import iconVehicle from "../../../shared/assets/icons/iconVehicle.svg";
import iconVehicleSelect from "../../../shared/assets/icons/iconVehicleSelect.svg";

import useModal from "@/src/hooks/use-modal";
import { useGarageStore } from "../../garage/model/garage.store";
import SearchButton from "../../search/ui/SearchButton";
import GarageButton from "../../garage/ui/GarageButton";
import Breadcrumbs from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useAccessoriesStore } from "@/src/entities/catalogAccessories/model/accessories.store";
import CartHeader from "../../cart/ui/CartHeader";

interface IProps {
  garageId?: number;
}

const VehicleFiltersLayout = ({ garageId }: IProps) => {
  const useFilters = useVehicleFiltersStore();

  const { filters, activeModification } = useFilters;
  const { countGarage } = useGarageStore();
  const { resetCategoryId } = useAccessoriesStore();
  const route = useRouter();
  const pathname = usePathname();
  const t = useTranslations("vehicle");
  const { openModal } = useModal();

  const handleVehicleClick = () => {
    // выбрать машину из гаража или показать каталог
    if (!countGarage) {
      openModal({
        type: "vehicle",
        visible: "right",
      });

      return;
    }

    if (!activeModification) {
      openModal({
        type: "vehicle-list",
        visible: "right",
      });

      return;
    }

    if (pathname === "/catalog") {
      openModal({
        type: "vehicle-list",
        visible: "right",
      });

      return;
    }

    route.push("/catalog");
  };

  useEffect(() => {
    if (filters.brands.length === 0) {
      useFilters.init();
    }
  }, [filters.brands.length, useFilters]);

  useEffect(() => {
    if (pathname !== "/accessories") {
      resetCategoryId();
    }
  }, [resetCategoryId, pathname]);

  return (
    <div className="flex flex-col">
      <div
        className="
        flex
        flex-1
        min-w-0
        flex-col
        gap-1

        sm:flex-row
        sm:items-center
        sm:gap-2
      "
      >
        {/* TOP ROW — MENU + VEHICLE */}
        <div
          className="
          flex
          min-w-0
          w-full
          items-center
          gap-1

          sm:flex-1
          sm:gap-2
        "
        >
          {/* MENU accessories */}
          <button
            type="button"
            onClick={() => {
              openModal({
                type: "accessories-menu",
                visible: "left",
              });
            }}
            className="
            flex
            h-[44px]
            w-[44px]
            shrink-0
            flex-col
            items-center
            justify-center
            rounded-md
            hover:bg-[#e9e9e9]

            sm:h-[50px]
            sm:w-[50px]
          "
          >
            {/* <div className="flex w-[14px] flex-col gap-[2px]">
              <span className="h-[1.5px] bg-[#333]" />
              <span className="h-[1.5px] bg-[#333]" />
              <span className="h-[1.5px] bg-[#333]" />
            </div> */}
            <Image
              src={iconAccessories}
              className="w-5 h-5"
              alt="icon accessories"
            />

            <span className="mt-[2px] text-[9px] leading-[10px]">
              Accessories
            </span>
          </button>

          {/* VEHICLE */}
          <button
            type="button"
            onClick={handleVehicleClick}
            className="
            flex
            h-[44px]
            min-w-0
            flex-1
            items-center
            justify-start
            overflow-hidden
            rounded-md
            px-2
            hover:cursor-pointer
            hover:bg-gray-900/[0.04]

            sm:h-[50px]
            sm:px-3
          "
          >
            {/* ICON */}
            <Image
              src={activeModification?.name ? iconVehicleSelect : iconVehicle}
              alt="icon vehicle car"
              width={15}
              height={15}
              className="
              mr-1.5
              h-[15px]
              w-[15px]
              shrink-0

              sm:mr-2
            "
            />

            {/* TEXT */}
            <div className="min-w-0 flex-1 overflow-hidden">
              {activeModification?.name ? (
                <span
                  className="
                  block
                  truncate
                  text-left
                  text-xs

                  sm:text-sm
                "
                >
                  {activeModification.brand} {activeModification.name}
                </span>
              ) : (
                <span
                  className="
                  block
                  truncate
                  text-left
                  text-xs

                  sm:text-sm
                "
                >
                  {t("addVehicle")} &gt;
                </span>
              )}
            </div>
          </button>

          {/* mobile icon menu */}
          <div className="flex sm:hidden gap-2">
            <GarageButton colorIcon="black" />
            <CartHeader colorIcon={"black"} />

            <button
              type="button"
              onClick={() => {
                openModal({
                  type: "mobile-contact-menu",
                  visible: "right",
                });
              }}
              className="
              flex
              h-[44px]
              w-[44px]
              shrink-0
              flex-col
              items-center
              justify-center
              rounded-md
              hover:bg-[#e9e9e9]

              sm:h-[50px]
              sm:w-[50px]
            "
            >
              <div className="flex w-[14px] flex-col gap-[2px]">
                <span className="h-[1.5px] bg-[#333]" />
                <span className="h-[1.5px] bg-[#333]" />
                <span className="h-[1.5px] bg-[#333]" />
              </div>

              <span className="mt-[2px] text-[9px] leading-[10px]">Menu</span>
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div
          className="
          w-full

          sm:w-auto
          sm:shrink-0
        "
        >
          <SearchButton />
        </div>
      </div>
      <Breadcrumbs />
    </div>
  );
};

export default VehicleFiltersLayout;
