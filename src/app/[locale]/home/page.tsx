// 'use client';

import VehicleFilters from "../../../features/vehicleFilters/ui/VehicleFilters";
import { useTranslations } from "next-intl";
import { Container } from "../../../shared/ui/layout/Container/Container";
import CatalogLayout from "../../../widgets/catalog/ui/CatalogLayout";

export default function Home() {
  const t = useTranslations("HomePage");
  

  return (
    <Container className="flex flex-col h-full p-[0]">
      <div className="flex flex-col items-start justify-start gap-4 bg-[#f2f4f3] w-full h-full py-[17px] px-[20px]">
        <VehicleFilters />
      </div>
      
      <CatalogLayout />
    </Container>
  );
}
