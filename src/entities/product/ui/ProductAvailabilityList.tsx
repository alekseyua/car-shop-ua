import ProductAvailabilityStatus from "@/src/shared/ui/status/ProductAvailabilityStatus";
import { ResponseStockDto, StockItem } from "../../product-detail/model/types";
import { useEffect } from "react";

interface Props {
    stock: ResponseStockDto[];
    showOnlyFirst?: boolean;
    onClick: (statusDelivery: string)=>any;
    setIsAvailable?: (value: boolean) => void;
}

export const ProductAvailabilityList = ({
    stock,
    showOnlyFirst = false,
    onClick,
    setIsAvailable,
}: Props) => {
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
        </div>
    );
};