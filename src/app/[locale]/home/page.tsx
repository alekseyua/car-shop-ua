'use client';

import VehicleFilters from "../../fuetures/vehicleFilters/ui/VehicleFilters";
import { useTranslations } from "next-intl";
import { Container } from "../../shared/ui/layout/Container/Container";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <Container>
      <div className="flex flex-col items-start justify-start gap-4 bg-[#f2f4f3] w-full h-full py-[17px] px-[20px]">
        <span className="text-3xl font-bold text-black">
          {t('FiltersVehicle.year.title')}
        </span>
        <VehicleFilters />
      </div>
    </Container>
  );
}
