'use client';

import VehicleFilters from "../../fuetures/vehicleFilters/ui/VehicleFilters";
import { useTranslations } from "next-intl";
import { Container } from "../../shared/ui/layout/Container/Container";
import Catalog from "../../fuetures/Catalog/ui/Catalog";
import { useVehicleFiltersStore } from "../../fuetures/vehicleFilters/model/store";

export default function Home() {
  const t = useTranslations("HomePage");
  const {filters} = useVehicleFiltersStore();
  
  return (
    <Container>
      <div className="flex flex-col items-start justify-start gap-4 bg-[#f2f4f3] w-full h-full py-[17px] px-[20px]">
        <span className="text-3xl font-bold text-black">
          {t('FiltersVehicle.year.title')}
        </span>
        <VehicleFilters />
      </div>
        {Object.keys(filters.catalogs).length > 0 && 
          <div className="flex flex-col w-full ">
            <Catalog />
          </div>
        }
    </Container>
  );
}
