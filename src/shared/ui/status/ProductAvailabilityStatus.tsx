import { useTranslations } from "next-intl";
import Image from "next/image";
import iconCartWhite from '../../../shared/assets/icons/cartWhite.svg';

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
    <div className="flex justify-between w-full">
      <div className="flex min-w-0 items-center gap-1">
        <span
          className={`${getStyleStatus(status)} h-[10px] w-[10px] shrink-0 rounded-full`}
        />

        <span className="min-w-0 truncate text-gray-500">{t(status)}</span>

        {count && (
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-gray-500">{count}</span>
            <span className="text-gray-500">{t("pieces")}</span>
          </div>
        )}
      </div>

      {onClick && (
        <div className="ml-auto">
          <button
            onClick={onClick}
            className="px-2.5 py-3 text-sm bg-red-500 text-white rounded hover:bg-red-600 hover:shadow-md transition duration-300 hover:cursor-pointer"
          >
            <Image
              src={iconCartWhite}
              alt="cart"
              width={20}
              height={20}
              className="hover:cursor-pointer hover:scale-110 transition-transform duration-300 bg-red-500 rounded-md p-[2px]"
              onClick={onClick}
            />
            {/* {t('order')} */}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductAvailabilityStatus;
