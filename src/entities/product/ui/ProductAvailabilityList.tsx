import ProductAvailabilityStatus from "@/src/shared/ui/status/ProductAvailabilityStatus";
import { ResponseStockDto, StockItem } from "../../product-detail/model/types";

interface Props {
    stock: ResponseStockDto[];
    showOnlyFirst?: boolean;
    onClick: (statusDelivery: string)=>any;
}

export const ProductAvailabilityList = ({
    stock,
    showOnlyFirst = false,
    onClick,
}: Props) => {
    const items = showOnlyFirst ? stock.slice(0, 1) : stock;

    return (
        <div className="flex flex-col gap-1 w-full">
            {items.map((item: ResponseStockDto, index: number) => (
                <div key={index} >
                    {item.statusDelivery !== "notAvailable" && (
                        <ProductAvailabilityStatus
                            status={item.statusDelivery}
                            count={item.quantity}
                            onClick={() => onClick(item.statusDelivery)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};