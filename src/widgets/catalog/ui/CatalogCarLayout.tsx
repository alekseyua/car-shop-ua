'use client';

import CatalogSidebar from '@/src/entities/catalog/ui/CatalogSidebar'
import CatalogTable from '@/src/entities/catalog/ui/CatalogTable'
import { useVehicleFiltersStore } from '@/src/features/vehicleFilters/model/vehicle.store'
import useModal from '@/src/hooks/use-modal'
import { useRouter } from '@/src/i18n/navigation';
import { useBreadcrumbStore } from '@/src/shared/stores/breadcrumbs/breadcrumbs.store';
import { useEffect } from 'react';

const CatalogCarLayout = () => {
    const {openModal} = useModal();
    const { activeModification } =
      useVehicleFiltersStore();
const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbItems);
const route = useRouter();

useEffect(() => {
  const listBreadcrumbs = [
    // {
    //   title: "Деталі товару",
    //   href: "",
    // },
  ];
  console.log({ activeModification });
  if (activeModification) {
    listBreadcrumbs.unshift({
      title: "Каталог",
      href: "/catalog",
    });
  }else {
    route.push('/');
  }
  setBreadcrumbs(listBreadcrumbs);

  return () => {
    useBreadcrumbStore.getState().resetBreadcrumbItems();
  };
}, [ setBreadcrumbs, activeModification, route]);

  return (
     <div
            className="
          md:grid grid-cols-[300px_1fr] gap-4 
          bg-white w-full h-full 
          sm:py-[17px] sm:px-[20px]
          py-4 px-2
          min-h-screen
          grid-cols-[1fr]
          "
          >
            {/* catalog for mobile */}
            <div className="md:hidden block p-3 -mt-3">
              <button
                className="mt-2
                    w-full
                    rounded-md
                    bg-blue-500
                    p-2
                    mb-3
                    text-white
                    transition-colors
                    hover:cursor-pointer
                    hover:bg-blue-600"
                onClick={() => openModal({ type: "menu-catalog", visible: "left" })}
              >
                {" "}
                catalog{" "} 
                {activeModification?.brand + " " + activeModification?.name}
              </button>
            </div>
            {/* catalog for desktop */}
            <div className="hidden md:block">
              <CatalogSidebar />
            </div>
            <CatalogTable />
          </div>
  )
}

export default CatalogCarLayout