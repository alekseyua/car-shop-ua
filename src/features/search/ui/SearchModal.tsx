import React from "react";
import { useSearchStore } from "../model/search.store";
import { useVehicleFiltersStore } from "../../vehicleFilters/model/vehicle.store";

const SearchModal = () => {
  const { getListSearch, listSearch } = useSearchStore();
  const useFilters = useVehicleFiltersStore();
  const { activeModification } = useFilters;
  return (
    <div className="flex flex-col w-[95vw] h-[85vh]">
      <h2 className="text-xl font-bold mb-4 text-center text-[#333]">
        Search Modal
      </h2>
      <input
        type="text"
        placeholder="Search for parts..."
        className="border text-[#333] p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#3b79d5] focus:border-transparent"
        onChange={(e) => getListSearch(e.target.value)}
      />
      {activeModification?.name ? (
        <div className="flex flex-col">
          <span className="text-start ml-2 text-sm min-w-[150px] max-w-[150px] truncate">
            {activeModification?.brand + " " + activeModification?.name}
          </span>
        </div>
      ) : (
        <div>

          {listSearch.map((l) => (
            <div key={l.itemNo}>{l.itemNo}</div>
          ))}
        </div>
)}
    </div>
  );
};

export default SearchModal;
