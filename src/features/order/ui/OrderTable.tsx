'use client';

import React from 'react'
import { useCartStore } from '../../cart/model/store';
import { CartItem } from '../../cart/model/types';
import Image from 'next/image';
import QuantitySelector from '@/src/shared/ui/QuantitySelector/QuantitySelector';
import { RemoveCartItemButton } from '../../cart/ui/RemoveCartItem';

const OrderTable = () => {
  const { cartItems, changeQuantity, removeFromCart } = useCartStore();
  return (
    <div className='flex gap-4 flex-col'>
      {cartItems.map((item: CartItem)=>(
        <div key={item.itemNo} className='grid grid-cols-[100px_1fr_70px_120px] items-center gap-2'>
          <div className='rounded-md border border-gray'>
          <Image 
            src={'https://img2.ad.ua/imgs/' + item.imageUrl} 
            alt={'preview_'+item?.imageUrl?.split('/').pop()} 
            width={80}
            height={80}
            style={{width: '80px', height: '80px', objectFit: 'contain'}}/>
            </div>
          <div  className='text-black'>{item?.title}</div>
          <div  className='text-black'>{Number(item?.price).toFixed(2)}</div>
          <div  className='text-black'>
            <QuantitySelector 
              initialValue={item.quantity}
              onChange={(count: number) => changeQuantity(item.itemNo, count)}
            />
            <RemoveCartItemButton
              onClick={() => removeFromCart(item.itemNo)}
            />
            </div>
        </div>
      ))}
    </div>
  )
}

export default OrderTable