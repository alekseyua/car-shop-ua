import ProductAvailabilityStatus from "@/src/shared/ui/status/ProductAvailabilityStatus";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ResponseStockDto } from "@/src/shared/api/dto";

interface Props {
    stock: ResponseStockDto[];
    showOnlyFirst?: boolean;
    onClick: (statusDelivery: string)=> void;
    setIsAvailable?: (value: boolean) => void;
}
export const ProductAvailabilityList = ({
    stock,
    showOnlyFirst = false,
    onClick,
    setIsAvailable,
}: Props) => {
    const t = useTranslations('catalog');
    const items = showOnlyFirst ? stock.slice(0, 1) : stock;
    useEffect(() => {
        const available = items.some(
            item => item.statusDelivery !== "notAvailable"
        );

        setIsAvailable?.(available);
    }, [items, setIsAvailable]);
    return (
        <div className="flex flex-col gap-1 w-full">
            {
                    items.map((item: ResponseStockDto, index: number) => (
                        <div key={index} >
                            {item.statusDelivery !== "notAvailable" && (
                                <ProductAvailabilityStatus
                                    status={item.statusDelivery}
                                    count={item.quantity}
                                    onClick={() => onClick(item.statusDelivery)}
                                />
                            )}
                        </div>
            ))
        }
            {items.length === 1 && !!!items[0].quantity && <div>{t('notAvailable')}</div>}
        </div>
    );
};