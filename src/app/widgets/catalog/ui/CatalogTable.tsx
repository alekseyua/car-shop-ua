import { ResponseCatalogItem } from '@/src/app/entities/catalog/api/dto';
import { useCatalogStore } from '@/src/app/entities/catalog/model/store';
import Image from 'next/image';
import gearIcom from '../../../shared/assets/icons/gear.svg';
import React from 'react'

const CatalogTable = () => {
    const { listItems }: { listItems: ResponseCatalogItem[] } = useCatalogStore();
  return (
    <div>
        {listItems.length > 0 ? (
            <div className="min-w-full bg-white gap-3 flex flex-col">
                      {listItems.map((item: ResponseCatalogItem) => (
                        <div key={item.itemNo} className="grid grid-cols-[150px_1fr_1fr_1fr] border rounded-md">
                              <Image src={item?.firstPic ? 'https://img2.ad.ua/imgs/' + item?.firstPic : gearIcom} alt={item.itemNo} width={150} height={150} className="object-cover rounded-l-md" />
                            <div className="py-2 px-4">{item.itemNo}</div>
                            <div className="py-2 px-4">{item.brand}</div>
                            <div className="py-2 px-4">{item.price}</div>
                        </div>
                    ))}
            </div>
        ) : (
            <p>No items found.</p>
        )}
    </div>
  )
}

export default CatalogTable