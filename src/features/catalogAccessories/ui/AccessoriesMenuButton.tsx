"use client";

import Image from "next/image";
import iconAccessories from "@/src/shared/assets/icons/iconAccessories.svg";
import useModal from "@/src/hooks/use-modal";

const AccessoriesMenuButton = () => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal({
      type: "accessories-menu",
      visible: "left",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Відкрити меню аксесуарів"
      className="
        flex
        h-[44px]
        w-[44px]
        shrink-0
        flex-col
        items-center
        justify-center
        rounded-md
        hover:bg-[#e9e9e9]

        min-[960px]:h-[50px]
        min-[960px]:w-[50px]
      "
    >
      <Image src={iconAccessories} className="w-5 h-5" alt="" />

      <span className="mt-[2px] text-[9px] leading-[10px]">Accessories</span>
    </button>
  );
};

export default AccessoriesMenuButton;
