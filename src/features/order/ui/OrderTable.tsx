'use client';

import React from 'react'
import { useCartStore } from '../../cart/model/store';
import { CartItem } from '../../cart/model/types';
import Image from 'next/image';

const OrderTable = () => {
  const { cartItems } = useCartStore();
  return (
    <div className='flex gap-4 flex-col'>
      {cartItems.map((item: CartItem)=>(
        <div key={item.itemNo} className='grid grid-cols-[100px_1fr_70px_70px] items-center gap-2'>
          <div className='rounded-md border border-gray'>
          <Image 
            src={'https://img2.ad.ua/imgs/' + item.firstPic} 
            alt={'preview_'+item.firstPic.split('/').pop()} 
            width={80}
            height={80}
            style={{width: '80px', height: '80px', objectFit: 'contain'}}/>
            </div>
          <div  className='text-black'>{item.description}</div>
          <div  className='text-black'>{item.price.toFixed(2)}</div>
          <div  className='text-black'>{item.quantity}</div>
        </div>
      ))}
    </div>
  )
}

export default OrderTable