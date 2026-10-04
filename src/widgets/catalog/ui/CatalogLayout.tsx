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

    if (mediaQuery.matches) {
      openModal({
        type: "menu-catalog",
        visible: "left",
        isActive: true,
      });
    }
  }, [activeModification, openModal]);

  // React.useEffect(() => {
  //   if(categoryId){
  //     route.push('/accessories')
  //   }
  // }, [categoryId, route]);
 
  // React.useEffect(() => {
  //   if (activeModification) {
  //     route.push("/catalog");
  //   }
  // }, [activeModification, route]);

  // if (categoryId) {
  //   return (
  //     <div
  //       className="bg-white w-full h-full min-h-screen
  //     py-4 px-2
  //     md:py-[17px] md:px-5"
  //     >
  //       <CatalogLayoutAccessories />
  //     </div>
  //   );
  // }
  // if (activeModification) {
  //   return (
  //     <div
  //       className="
  //     md:grid grid-cols-[300px_1fr] gap-4 
  //     bg-white w-full h-full 
  //     sm:py-[17px] sm:px-[20px]
  //     py-4 px-2
  //     min-h-screen
  //     grid-cols-[1fr]
  //     "
  //     >
  //       {/* catalog for mobile */}
  //       <div className="md:hidden block p-3 -mt-3">
  //         <button
  //           className="mt-2
  //               w-full
  //               rounded-md
  //               bg-blue-500
  //               p-2
  //               mb-3
  //               text-white
  //               transition-colors
  //               hover:cursor-pointer
  //               hover:bg-blue-600"
  //           onClick={() => openModal({ type: "menu-catalog", visible: "left" })}
  //         >
  //           {" "}
  //           catalog{" "} 
  //           {activeModification.brand + " " + activeModification.name}
  //         </button>
  //       </div>
  //       {/* catalog for desktop */}
  //       <div className="hidden md:block">
  //         <CatalogSidebar />
  //       </div>
  //       <CatalogTable />
  //     </div>
  //   );
  // }

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
