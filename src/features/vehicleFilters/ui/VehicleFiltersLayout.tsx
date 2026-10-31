"use client";

import SearchButton from "../../search/ui/SearchButton";
import Breadcrumbs from "@/src/shared/ui/breadcrumbs/Breadcrumbs";
import OrdersDropdown from "../../order/ui/OrdersDropdown";
import AccessoriesMenuButton from "../../catalogAccessories/ui/AccessoriesMenuButton";
import VehicleSelectButton from "./VehicleSelectButton";
import MobileHeaderActions from "@/src/widgets/header/ui/MobileHeaderActions";

interface IProps {
  garageId?: number;
}

const VehicleFiltersLayout = ({ garageId }: IProps) => {

  return (
    <div className="flex flex-col">
      <div
        className="
        flex
        flex-1
        min-w-0
        flex-col
        gap-1
        min-[960px]:flex-row
        min-[960px]:items-center
        min-[960px]:gap-2
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

          min-[960px]:flex-1
          min-[960px]:gap-2
        "
        >
          {/* MENU accessories */}

          <AccessoriesMenuButton />

          {/* VEHICLE */}
          <VehicleSelectButton />

          {/* Кнопка Замовлення з дропдауном та роутингом */}
          <OrdersDropdown />
          {/* mobile icon menu */}
          <MobileHeaderActions />
        </div>

        {/* SEARCH */}
        <div
          className="
          w-full

          min-[960px]:w-auto
          min-[960px]:shrink-0
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
