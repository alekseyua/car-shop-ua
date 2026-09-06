"use client";

import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useVehicleFiltersStore } from "../../../features/vehicleFilters/model/vehicle.store";
import { useCatalogStore } from "../../../entities/catalog/model/catalog.store";
import { useTranslations } from "next-intl";
import useModal from "@/src/hooks/use-modal";

const CatalogSidebar = () => {
  const { filters } = useVehicleFiltersStore();
  const { closeModal } = useModal();
  const t = useTranslations();
  const { getListItemsCatalogCatalog } = useCatalogStore();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
const [search, setSearch] = useState("");

  const toggleGroup = (groupCode: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupCode]: !prev[groupCode],
    }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  }

  const filteredCatalogs = Object.entries(filters.catalogs).reduce(
    (acc, [groupCode, catalogItems]) => {
      const searchValue = search.trim().toLowerCase();

      // Если поиск пустой — показываем всё
      if (!searchValue) {
        acc[groupCode] = catalogItems;
        return acc;
      }

      // Проверяем groupCode
      const groupMatches = groupCode.toLowerCase().includes(searchValue);

      // Фильтруем элементы внутри группы
      const filteredItems = catalogItems.filter((item) =>
        item.subGroupCode.toLowerCase().includes(searchValue),
      );

      // Если совпал groupCode — оставляем всю группу
      if (groupMatches) {
        acc[groupCode] = catalogItems;
        return acc;
      }

      // Если совпали subGroupCode — оставляем только совпавшие
      if (filteredItems.length > 0) {
        acc[groupCode] = filteredItems;
      }

      return acc;
    },
    {} as typeof filters.catalogs,
  );

  return (
    <div className="flex flex-col gap-1 ">
      <span className="text-2xl font-bold text-black">
        {t("catalog.title")}
      </span>
      {/* search */}
      <div className="mb-3 flex w-full">
        <div className="flex h-8 w-full items-center rounded-md border bg-[#f8f8f8]">
          <input
            type="text"
            placeholder={t("catalog.searchCatalogCar")}
            className="
              h-full
              w-full
              min-w-0
              rounded-md
              bg-transparent
              px-3
              text-sm
              text-[#333]
              outline-none
              placeholder:text-[#757575]
              placeholder:opacity-100

              focus:border-transparent
              focus:ring-2
              focus:ring-[#3b79d5]

              sm:px-3
              sm:text-base
            "
            onChange={handleSearch}
          />
        </div>
      </div>
      {/* menu catalog */}

      {Object.entries(filteredCatalogs).map(([groupCode, catalogItem]) => {
        const isOpen = openGroups[groupCode];

        return (
          <div
            key={groupCode}
            className=" rounded-md border border-gray-200 bg-white"
          >
            {/* HEADER (кликабельный) */}
            <div
              onClick={() => toggleGroup(groupCode)}
              className="px-2 py-1 cursor-pointer flex justify-between items-center"
            >
              <span className="text-lg font-semibold text-gray-900 hover:text-gray-700">
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
                    className="px-2 py-1 
                                          text-sm text-black hover:cursor-pointer hover:text-gray-700 transition-colors duration-300
                                          grid grid-cols-[150px_1fr] items-start"
                    onClick={() => {
                      closeModal();
                      getListItemsCatalogCatalog(item.typeId, item.groupId);
                    }}
                  >
                    <span>{item.subGroupCode}</span>

                    <div className="flex items-center gap-2 justify-end  h-full">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {item.count} parts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CatalogSidebar;
