import React from 'react'
import CatalogSidebar from './CatalogSidebar'
import CatalogTable from './CatalogTable'

const CatalogLayout = () => {
    return (
        <div className="grid gap-4 grid-cols-[300px_1fr] bg-white w-full h-full py-[17px] px-[20px]">
            <CatalogSidebar />
            <CatalogTable />
        </div>
    )
}

export default CatalogLayout