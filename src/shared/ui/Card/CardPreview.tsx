import Image from 'next/image'
import React from 'react'
import RaitingItemCard from '../Raiting/RaitingItemCard'
import gearIcon from '../../../shared/assets/icons/gear.svg'
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';

interface CardPreviewProps {
    imageSrc: string;
    title: string;
    description: string;
    rating: number;
    price: number;
    oldPrice?: number;
}

const CardPreview: React.FC<CardPreviewProps> = ({ imageSrc, title, description, rating, price, oldPrice }) => {
    const t = useTranslations();
    return (
        <Link className="
                            flex flex-col gap-1 
                            border rounded-md 
                            min-w-full align-items-center p-2
                            hover:shadow-md transition-shadow duration-300 hover:cursor-pointer
                        "
            href={`/catalog/detail/${title}`}
        >
            <Image
                src={imageSrc ?? gearIcon}
                alt={title}
                width={150} height={150}
                className="object-contain rounded-l-md h-[150px] m-[0_auto]"
            />
            <div className="font-semibold text-md text-[#171717] ">{title}</div>
            <div className="
                            text-[#3b79d5] text-sm leading-none line-clamp-2 h-[calc(2*1.2rem)] hit-highlight
                            hover:text-[#3b79d5]
                            "
            >{description}</div>
            <div className="text-[#737373] text-sm flex items-center gap-1"> {<RaitingItemCard count={4} />}- {t('raiting.views', { count: 0 })}</div>
            <div className="flex items-center gap-1">
                <div className={`text-[#171717] text-lg font-extrabold ${oldPrice ? 'line-through text-gray-500 text-sm' : ''}`}>{price} ₴</div>
                {oldPrice && <span className="text-red-500 text-lg font-bold">{oldPrice} ₴</span>}
            </div>
        </Link>
    )
}

export default CardPreview