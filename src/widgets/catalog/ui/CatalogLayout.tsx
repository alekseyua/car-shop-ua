"use client";

import React from "react";
import TopProductLayout from "./TopProductLayout";
import { useVehicleFiltersStore } from "@/src/features/vehicleFilters/model/vehicle.store";
import useModal from "@/src/hooks/use-modal";

const CatalogLayout = () => {
  const { activeModification } = useVehicleFiltersStore();
  const { openModal } = useModal();
  React.useEffect(() => {
    if (!activeModification) return;
    
    const mediaQuery = window.matchMedia("(max-width: 699px)");
    console.log({ mediaQuery });

    if (mediaQuery.matches) {
      openModal({
        type: "menu-catalog",
        visible: "left",
        isActive: true,
      });
    }
  }, [activeModification, openModal]);

  return (
    <div
      className="bg-white w-full h-full min-h-[calc(100vh-151px)]
    "
    >
      <TopProductLayout />;
    </div>
  );
};

export default CatalogLayout;
