"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import iconVehicle from "@/src/shared/assets/icons/iconVehicle.svg";
import iconVehicleSelect from "@/src/shared/assets/icons/iconVehicleSelect.svg";

import useModal from "@/src/hooks/use-modal";
import { useGarageStore } from "@/src/features/garage/model/garage.store";
import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";
import { useVehicleFiltersStore } from "../model/vehicle.store";

import { usePathname, useRouter } from "@/src/i18n/navigation";

const VehicleSelectButton = () => {
  const { openModal } = useModal();

  const { countGarage } = useGarageStore();
  const user = useAuthStore((state) => state.user);

  const activeModification = useVehicleFiltersStore(
    (state) => state.activeModification,
  );

  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("vehicle");

  const handleVehicleClick = () => {
    if (!countGarage && user) {
      openModal({
        type: "vehicle",
        visible: "right",
      });

      return;
    }

    if (!activeModification) {
      openModal({
        type: "vehicle",
        visible: "right",
      });

      return;
    }

    if (pathname === "/catalog") {
      if (!user) {
        openModal({
          type: "vehicle",
          visible: "right",
        });

        return;
      }

      openModal({
        type: "vehicle-list",
        visible: "right",
      });

      return;
    }

    router.push("/catalog");
  };

  return (
    <button
      type="button"
      onClick={handleVehicleClick}
      className="
        flex
        h-[44px]
        min-w-0
        flex-1
        items-center
        justify-start
        overflow-hidden
        rounded-md
        px-2
        hover:cursor-pointer
        hover:bg-gray-900/[0.04]

        min-[960px]:h-[50px]
        min-[960px]:px-3
      "
    >
      <Image
        src={activeModification?.name ? iconVehicleSelect : iconVehicle}
        alt="icon vehicle car"
        width={15}
        height={15}
        className="
          mr-1.5
          h-[15px]
          w-[15px]
          shrink-0

          min-[960px]:mr-2
        "
      />

      <div className="min-w-0 flex-1 overflow-hidden">
        {activeModification?.name ? (
          <span className="block truncate text-left text-xs min-[960px]:text-sm">
            {activeModification.brand} {activeModification.name}
          </span>
        ) : (
          <span className="block truncate text-left text-xs min-[960px]:text-sm">
            {t("addVehicle")} &gt;
          </span>
        )}
      </div>
    </button>
  );
};

export default VehicleSelectButton;
