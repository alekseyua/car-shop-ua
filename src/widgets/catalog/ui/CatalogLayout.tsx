"use client";

import React from "react";
import CatalogSidebar from "./CatalogSidebar";
import CatalogTable from "./CatalogTable";
import TopProductLayout from "./TopProductLayout";
import { useVehicleFiltersStore } from "@/src/features/vehicleFilters/model/vehicle.store";
import CatalogLayoutAccessories from "../../catalogAccessories/ui/CatalogLayoutAccessories";
import { useAccessoriesStore } from "@/src/entities/catalogAccessories/model/accessories.store";

const CatalogLayout = () => {
  const { activeModification } = useVehicleFiltersStore();
  const { categoryId } = useAccessoriesStore();
  console.log({ categoryId });
  if (categoryId) {
    return (
      <div className="bg-white w-full h-full py-[17px] px-[20px] min-h-screen">
        <CatalogLayoutAccessories />
      </div>
    );
  }
  if (activeModification) {
    return (
      <div className="grid gap-4 grid-cols-[300px_1fr] bg-white w-full h-full py-[17px] px-[20px]  min-h-screen">
        <CatalogSidebar />
        <CatalogTable />
      </div>
    );
  }
  return (
    <div className="bg-white w-full h-full py-[17px] px-[20px] min-h-[calc(100vh-151px)]">
      <TopProductLayout />;
    </div>
  );
};

export default CatalogLayout;
