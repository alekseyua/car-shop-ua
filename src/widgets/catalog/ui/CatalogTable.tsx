import { ResponseCatalogItem } from '@/src/entities/catalog/api/dto';
import { useCatalogStore } from '@/src/entities/catalog/model/store';
import { useTranslations } from 'next-intl';
import CardPreview from '@/src/shared/ui/Card/CardPreview';

const CatalogTable = () => {
    const { listItems }: { listItems: ResponseCatalogItem[] } = useCatalogStore();
    const t = useTranslations();

    return (
        <div>
            {listItems.length > 0 ? (
                <div className="
                        w-full 
                        bg-white 
                        grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3
                        justify-items-center
                        ">
                    {listItems.map((item: ResponseCatalogItem) => (
                        <CardPreview
                            key={item.itemNo}
                            imageSrc={'https://img2.ad.ua/imgs/' + item.firstPic}
                            title={item.itemNo}
                            description={item.description}
                            rating={4} // Placeholder rating
                            price={item.price}
                            oldPrice={item.retail !== item.price ? item.retail : undefined}
                            item={item}
                        />
                    ))}
                </div>
            ) : (
                <p>{t("card.notProduct")}</p>
            )}
        </div>
    )
}

export default CatalogTable;