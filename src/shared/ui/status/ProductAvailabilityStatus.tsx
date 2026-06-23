import { useTranslations } from "next-intl";
import React from "react";
interface Props {
  status: string;
  count?: number;
  onClick?: () => void;
}

const ProductAvailabilityStatus = ({ status, count, onClick }: Props) => {
  const t = useTranslations('catalog');
  const getStyleStatus = (status: string): string => {
    const styleStatus: Record<string, string> = {
      today: "bg-green-500",
      tomorrow: "bg-yellow-500",
      reserved: "bg-orange-500",
      notAvailable: "bg-red-500"
    };
    return styleStatus[status];
  };
  return (
    <div className="flex">
      <div className="flex felx-nowrap gap-1 items-center">
        <span
          className={getStyleStatus(status) + ' block rounded-full w-[10px] h-[10px]'}
          ></span>
        <span className="text-gray-500">{t(status)}</span>
       {count && <div> <span className="text-gray-500">{count}</span>
        <span className="text-gray-500">{t('pieces')}</span></div>
        }
      </div>
      {onClick  && <div className="ml-auto">
        <button
          onClick={onClick}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 hover:shadow-md transition duration-300 hover:cursor-pointer"
        >
          {t('order')}
        </button>
      </div>}
    </div>
  );
};

export default ProductAvailabilityStatus;
