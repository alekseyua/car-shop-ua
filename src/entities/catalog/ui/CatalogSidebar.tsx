"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useVehicleFiltersStore } from "../../../features/vehicleFilters/model/vehicle.store";
import { useCatalogStore } from "../../../entities/catalog/model/catalog.store";
import { useTranslations } from "next-intl";
import useModal from "@/src/hooks/use-modal";
import Loading from "@/src/shared/ui/loading/Loading";
import { goToTop } from "@/src/shared/libs/helpers";

const CatalogSidebar = () => {
  const { filters } = useVehicleFiltersStore();
  const { closeModal } = useModal();
  const t = useTranslations();
  const {
    getListItemsCatalogCatalog,
    isLoadingItemsCatalog,
    currentItemCatalog,
  } = useCatalogStore();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  const toggleGroup = (groupCode: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupCode]: !prev[groupCode],
    }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

  const clearSearch = () => {
    setSearch('');
  }

  useEffect(() => {
    console.log("filters.catalogs ", filters.catalogs );
    setOpenGroups({});
  }, [filters.catalogs]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-1">
      {/* TITLE */}
      <span className="shrink-0 text-2xl font-bold text-black">
        {t("catalog.title")}
      </span>

      {/* SEARCH */}
      <div className="mb-3 flex w-full shrink-0">
        <div className="relative flex h-8 w-full items-center rounded-md border bg-[#f8f8f8]">
          <input
            type="text"
            value={search}
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
         { search && <span className="absolute right-2 cursor-pointer text-gray-400"
            onClick={clearSearch}
          >X</span>}
        </div>
      </div>

      {/* MENU CATALOG */}
      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overflow-x-hidden
          pr-1
          scrollbar-thin
          scrollbar-thumb-gray-300
          scrollbar-track-transparent
        "
      >
        <div className="flex flex-col gap-1">
          {Object.entries(filteredCatalogs).map(([groupCode, catalogItem]) => {
            const isOpen = openGroups[groupCode];

            return (
              <div
                key={groupCode}
                className="relative rounded-md border border-gray-200 bg-white"
              >
                {/* HEADER */}
                <div
                  onClick={() => toggleGroup(groupCode)}
                  className="
                      flex
                      cursor-pointer
                      items-center
                      justify-between
                      px-2
                      py-1
                    "
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
                        className={`
                            relative
                            grid
                            grid-cols-[150px_1fr]
                            items-start
                            px-2
                            py-1
                            text-sm
                            text-black
                            transition-colors
                            duration-300
                            ${currentItemCatalog === item.groupId ? "text-red-600 pointer-events-none" : ""}
                            ${currentItemCatalog !== item.groupId ? "cursor-pointer hover:text-gray-700" : ""}
                          `}
                        onClick={() => {
                          closeModal();
                          getListItemsCatalogCatalog(item.typeId, item.groupId);
                          goToTop();
                        }}
                      >
                        <span>{item.subGroupCode}</span>

                        <div className="flex h-full items-center justify-end gap-2">
                          <span className="whitespace-nowrap text-xs text-gray-500">
                            {item.count} parts
                          </span>
                        </div>

                        {isLoadingItemsCatalog &&
                          currentItemCatalog === item.groupId && (
                            <div className="absolute w-full h-full bg-gray-900/30 z-999 flex items-center justify-end pr-4">
                              <Loading size={20} />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CatalogSidebar;
