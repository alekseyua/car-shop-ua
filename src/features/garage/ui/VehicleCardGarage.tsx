"use client";

import Image from "next/image";
import iconCheck from "../../../shared/assets/icons/iconCheck.svg";
import iconVehicle from "../../../shared/assets/icons/iconVehicle.svg";
import iconDelete from "../../../shared/assets/icons/delete.svg";

type VehicleCardGarageProps = {
  isActive?: boolean;
  year: string;
  make: string;
  model: string;
  engine:string;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelect: () => void;
};

export default function VehicleCardGarage({
  isActive = false,
  year,
  make,
  model,
  engine,
  onDelete,
  onSelect
}: VehicleCardGarageProps) {
  return (
    <div 
      className="relative w-full max-w-[1070px] overflow-hidden shrink-0
                  rounded-[9px] border-[3px] border-orange-500 bg-white 
                  shadow-[0_3px_6px_rgba(0,0,0,0.2)]
                  hover:cursor-pointer hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)]
                   transition-shadow duration-300 ease-in-out"
      onClick={onSelect}
    >
      {/* Orange corner */}
      {isActive && (
        <div className="absolute left-[-15px] top-[-15px] z-10 h-[70px] w-[70px] overflow-hidden">
          <div className="absolute -left-[20px] -top-[20px] flex h-[68px] w-[68px] rotate-45 items-end justify-center bg-orange-500 pb-[7px]">
            <Image
              className="absolute right-[1px] bottom-[23px] h-5 w-5 -rotate-45 text-white"
              src={iconCheck}
              alt="Check icon"
            />
          </div>
        </div>
      )}

      <div className="flex min-h-0 items-center px-2">
        {/* Car icon */}
        <div className="flex px-2 shrink-0 items-center justify-center">
          <Image
            className="h-30 w-30"
            src={iconVehicle}
            alt="Vehicle icon"
            width={120}
            height={120}
          />
        </div>

        {/* Vehicle info */}
        <div className="min-w-0 flex-1">
          <p className="mt-1 text-[15px] font-bold leading-snug text-[#292929]">
            {year}
          </p>
          <h2 className="text-[22px] font-bold leading-tight text-[#292929]">
            {make}
          </h2>
          <p className="mt-1 text-[15px]  leading-snug text-[#292929]">
            {model}
          </p>{" "}
          <p className="mt-1 text-[15px]  leading-snug text-[#292929]">
            {engine}
          </p>
        </div>

        {/* Delete */}
       {onDelete && <button
          type="button"
          onClick={e=>onDelete(e)}
          aria-label="Delete vehicle"
          className=" 
            flex p-2 justify-center 
            rounded-md text-[#292929] transition-colors 
            hover:bg-gray-100
            hover:cursor-pointer
            active:bg-gray-200"
        >
          <Image
            className="w-10 h-10"
            src={iconDelete}
            alt="Delete icon"
            width={40}
            height={40}
          />
        </button>}
      </div>
    </div>
  );
}