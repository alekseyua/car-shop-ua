import React, { useState } from 'react'
import { useVehicleFiltersStore } from '../../vehicleFilters/model/store';

const Catalog = () => {
      const {filters} = useVehicleFiltersStore();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (groupCode: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [groupCode]: !prev[groupCode],
        }));
    };

  return (
      <div className="grid grid-cols-[300px_1fr] bg-white w-full h-full py-[17px] px-[20px]">
          <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-black">Catalog</span>

              {Object.entries(filters.catalogs).map(([groupCode, catalogItem]) => {
                  const isOpen = openGroups[groupCode];

                  return (
                      <div key={groupCode} className="border rounded-md bg-white">

                          {/* HEADER (кликабельный) */}
                          <div
                              onClick={() => toggleGroup(groupCode)}
                              className="px-2 py-1 cursor-pointer flex justify-between items-center"
                          >
                              <span className="text-lg font-semibold text-[#1a66ff]">
                                  {groupCode}
                              </span>

                              <span className="text-xs text-gray-400">
                                  {catalogItem.length}
                              </span>
                          </div>

                          {/* DROPDOWN */}
                          {isOpen && (
                              <div className="border-t">
                                  {catalogItem.map((item) => (
                                      <div
                                          key={item.subGroupCode}
                                          className="px-2 py-1 text-sm text-black grid grid-cols-[150px_1fr] items-start"
                                      >
                                          <span>{item.subGroupCode}</span>

                                          <div className="flex items-center gap-2 justify-end">
                                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                                  {item.count} parts
                                              </span>

                                              <button className="px-2 py-1 text-xs text-white bg-[#ed1c24] rounded-md hover:bg-[#c71515] transition-colors duration-300">
                                                  View
                                              </button>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>
                  );
              })}
          </div>

          <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-black">Details</span>
          </div>
      </div>
  )
}

export default Catalog