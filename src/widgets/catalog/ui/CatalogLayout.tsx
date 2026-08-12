'use client';

import React from 'react'
import CatalogSidebar from './CatalogSidebar'
import CatalogTable from './CatalogTable'
import TopProductLayout from './TopProductLayout'
import { useVehicleFiltersStore } from '@/src/features/vehicleFilters/model/vehicle.store';

const CatalogLayout = () => {
    const { activeModification } = useVehicleFiltersStore();

    if (activeModification) {
        return (
            <div className="grid gap-4 grid-cols-[300px_1fr] bg-white w-full h-full py-[17px] px-[20px]">
                <CatalogSidebar />
                <CatalogTable />
            </div>
        )
    }
        return <TopProductLayout />
}

export default CatalogLayout