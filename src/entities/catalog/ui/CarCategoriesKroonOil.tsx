"use client";

import { useState } from "react";
import Link from "next/link";
import { CarCategory } from "../api/dto";
import { useVehicleFiltersStore } from "@/src/features/vehicleFilters/model/vehicle.store";


type CarCategoriesProps = {
  categories: CarCategory[] | null;
};

const categoryTitles: Record<string, string> = {
  Cars: "Легковые автомобили",
  "Cars of China (CHN)": "Автомобили Китая (CHN)",
  "Cars of Russia (RUS)": "Автомобили России (RUS)",
};

export default function CarCategories({
  categories,
}: CarCategoriesProps) {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const activeModification = useVehicleFiltersStore(s=>s.activeModification);
    if(!categories) return null;
  return (
    <section className="w-full overflow-hidden rounded-lg bg-[#ebebeb]">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 sm:py-10 lg:px-[7.5%] lg:py-10">
        <h2 className="mb-5 text-xl font-extrabold leading-tight tracking-tight">
          Мастило для {activeModification?.brand}
        </h2>
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {categories.map((category, index) => {
            const isOpen = openCategory === index;

            return (
              <section key={category.title}>
                {/* Заголовок категории */}
                <h2 className="mb-5 text-xl font-extrabold leading-tight tracking-tight">
                  {categoryTitles[category.title] ?? category.title}
                </h2>

                {/* Аккордеон */}
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenCategory(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-bold leading-snug">
                      {category.items[0]?.title
                        .split(" ")
                        .slice(0, 5)
                        .join(" ")}
                    </span>

                    <svg
                      className={`h-6 w-6 shrink-0 transition-transform duration-300 sm:h-7 sm:w-7 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="m4 9 8 8 8-8"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-5 pb-3 pt-5 sm:space-y-6 sm:pt-7 lg:space-y-8 lg:pt-8">
                        {category.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.url}
                            tabIndex={isOpen ? 0 : -1}
                            className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                          >
                            <span className="text-sm leading-snug underline decoration-1 underline-offset-2 transition-colors hover:text-sky-200">
                              {item.title}
                            </span>

                            <span className="shrink-0 text-sm font-medium text-[#ffdf00] sm:pt-0.5">
                              {item.years.replace(" and after", " и позже")}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}