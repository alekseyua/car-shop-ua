'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import RaitingItemCard from '../Raiting/RaitingItemCard'
import gearIcon from '../../../shared/assets/icons/gear.svg'
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import iconCart from '../../../shared/assets/icons/cart.svg';
import { handleAddToCart } from '@/src/features/cart/model/cart.actions';
import { ProductAvailabilityList } from '@/src/entities/product/ui/ProductAvailabilityList'

interface CardPreviewProps {
    imageSrc: string;
    title: string;
    description: string;
    rating: number;
    price: number;
    oldPrice?: number;
    item: any
}

const CardPreview: React.FC<CardPreviewProps> = ({ imageSrc, title, description, rating, price, oldPrice, item }) => {
    const t = useTranslations();
    const [isAvailable, setIsAvailable] = useState(true);
    return (
        <div className="relative w-full">
            {!isAvailable && (
                <div className="absolute inset-0 bg-black/10 z-1 rounded-md pointer-events-none border-gray-400 rounded-md" />
            )}

            <div
                data-name="CardPreview"
                className={`
                flex flex-col gap-1 
                shadow-md
                items-left p-2 w-full max-w-[250px] rounded-md
                hover:shadow-md transition-shadow duration-300 hover:cursor-pointer
                overflow-hidden
                `}
            >
                <Link
                    href={`/catalog/detail/${title}`}
                >
                    <Image
                        src={imageSrc ?? gearIcon}
                        alt={title}
                        width={150} height={150}
                        className={`
                    object-contain rounded-l-md h-[150px] m-[0_auto]
                `}
                    />
                    <div className="font-semibold text-md text-[#171717] ">{title}</div>
                    <div className="
                            text-[#3b79d5] text-sm leading-none line-clamp-2 h-[calc(2*1.2rem)] hit-highlight
                            hover:text-[#3b79d5]
                            "
                    >{description}</div>
                    <div className="text-[#737373] text-sm flex items-center gap-1 whitespace-nowrap min-w-0 truncate"> {<RaitingItemCard count={4} />}- {t('raiting.views', { count: 0 })}</div>
                </Link>
                <div
                    className={'flex flex-col justify-between items-center gap-2 mt-1 w-full'}
                >
                    <div className="flex w-full items-center justify-start gap-1">
                        <div className={`text-[#171717] text-lg font-extrabold ${oldPrice ? 'line-through text-gray-500 text-sm' : ''}`}>{price.toFixed(2)} ₴</div>
                        {oldPrice && <span className="text-red-500 text-lg font-bold -top-2 relative">{oldPrice} ₴</span>}
                    </div>
                    <div className='flex w-full min-h-[30px]'>
                        
                        <ProductAvailabilityList
                            onClick={(statusDelivery: string) => handleAddToCart(item, statusDelivery)}
                            stock={item.stock}
                            showOnlyFirst={true}
                            setIsAvailable={setIsAvailable}
                        />
                    </div>
                    {/* <div
                    className="flex items-center justify-center w-8 h-8 rounded bg-[#f5222d] hover:bg-[#ed1c24] transition-colors duration-200"
                    onClick={(e) => handleAddToCart(item, 'item.stock')}
                >
                    <Image
                        src={iconCart}
                        alt="Add to cart"
                        width={15}
                        height={15}
                        style={{
                            width: '15px',
                            height: '15px',
                        }}
                    />
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default CardPreview