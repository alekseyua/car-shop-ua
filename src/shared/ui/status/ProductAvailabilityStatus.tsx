import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import iconCartWhite from "../../../shared/assets/icons/cartWhite.svg";

interface Props {
  status: string;
  count?: number;
  onClick?: () => void;
  classNameButton?: string;
  buttonBuyText?: string;
}

const ProductAvailabilityStatus = ({
  status,
  count,
  onClick,
  classNameButton,
  buttonBuyText,
}: Props) => {
  const t = useTranslations("catalog");

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Показываем анимацию
    setClicked(true);

    // Выполняем переданный onClick
    onClick?.();

    // Через 600мс убираем кольцо
    setTimeout(() => {
      setClicked(false);
    }, 600);
  };

  const getStyleStatus = (status: string): string => {
    const styleStatus: Record<string, string> = {
      today: "bg-green-500",
      tomorrow: "bg-yellow-500",
      reserved: "bg-orange-500",
      notAvailable: "bg-red-500",
    };

    return styleStatus[status] ?? "bg-gray-400";
  };

  return (
    <div className="flex justify-between w-full">
      {/* STATUS */}
      <div className="flex min-w-0 items-center gap-1">
        <span
          className={`
            ${getStyleStatus(status)}
            h-[10px]
            w-[10px]
            shrink-0
            rounded-full
          `}
        />

        <span className="min-w-0 truncate text-gray-500">{t(status)}</span>

        {count !== undefined && (
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-gray-500">{count}</span>

            <span className="text-gray-500">{t("pieces")}</span>
          </div>
        )}
      </div>

      {/* CART */}
      {onClick && (
        <div className="ml-auto relative">
          <button
            type="button"
            onClick={handleClick}
            className={`
              relative
              flex
              items-center
              justify-center
              rounded-md
              bg-red-500
              hover:bg-red-700
              hover:scale-110
              cursor-pointer
              transition-all
              duration-300
              focus:outline-none
              ${classNameButton}
            `}
          >
            {/* АНИМАЦИЯ КОЛЬЦА */}
            {clicked && (
              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  border-2
                  border-red-500
                  animate-ping
                  pointer-events-none
                "
              />
            )}

            <Image
              src={iconCartWhite}
              alt="cart"
              width={32}
              height={32}
              className="
                relative
                z-10
                w-8
                h-8
                p-2
                rounded-md
              "
            />
            {buttonBuyText && 
            <span className="text-base text-black">
              {buttonBuyText}
            </span>
            }
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductAvailabilityStatus;
