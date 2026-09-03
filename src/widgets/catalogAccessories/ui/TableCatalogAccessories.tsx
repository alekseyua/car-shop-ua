'use client';

import { useAccessoriesStore } from '@/src/entities/catalogAccessories/model/accessories.store';
import { getOldPrice } from '@/src/shared/libs/helpers';
import CardPreview from '@/src/shared/ui/Card/CardPreview';
import { Pagination } from '@/src/shared/ui/Pagination/Pagination';

const TableCatalogAccessories = () => {
  const {
    catalogAccessories,
    page,
    total,
    totalPages,
    isLoading,
    nextPage,
    prevPage,
    goToPage,
    showMore,
  } = useAccessoriesStore();

  // if (isLoading) {
  //   return (<div> loading ....</div>)
  // }
    return (
      <div className="w-full">
        <div
          className="
                        w-full 
                        bg-white 
                        grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3
                        justify-items-center
                        "
        >
          {catalogAccessories.map((item) => (
            <CardPreview
              key={item.itemNo}
              imageSrc={"https://img2.ad.ua/imgs/" + item.firstPic}
              title={item.itemNo}
              description={item.description}
              rating={4} // Placeholder rating
              price={item.price}
              oldPrice={
                                  item.inStock
                                    ? getOldPrice(item.price)
                                    : undefined
                                }
              item={item}
            />
          ))}
        </div>
        <div className=" mt-4">
          <Pagination
            page={page}
            total={total}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            goToPage={goToPage}
            showMore={showMore}
          />
        </div>
      </div>
    );
}

export default TableCatalogAccessories