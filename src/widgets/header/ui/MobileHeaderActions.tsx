
"use client";

import GarageButton from "@/src/features/garage/ui/GarageButton";
import CartHeader from "@/src/features/cart/ui/CartHeader";
import useModal from "@/src/hooks/use-modal";

const MobileHeaderActions = () => {
  const { openModal } = useModal();

  const handleOpenContactMenu = () => {
    openModal({
      type: "mobile-contact-menu",
      visible: "right",
    });
  };

  return (
    <div className="flex min-[960px]:hidden gap-2 items-center justify-center">

      {/* GARAGE */}
      <div className="flex shrink-0 items-center">
        <GarageButton colorIcon="black" />
      </div>

      {/* CART */}
      <div className="flex shrink-0 items-center">
        <CartHeader colorIcon="black" />
      </div>

      {/* CONTACT MENU */}
      <button
        type="button"
        onClick={handleOpenContactMenu}
        aria-label="Відкрити меню контактів"
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
        <div className="flex w-[14px] flex-col gap-[2px]">
          <span className="h-[1.5px] bg-[#333]" />
          <span className="h-[1.5px] bg-[#333]" />
          <span className="h-[1.5px] bg-[#333]" />
        </div>

        <span className="mt-[2px] text-[9px] leading-[10px]">
          Menu
        </span>
      </button>
    </div>
  );
};

export default MobileHeaderActions;
