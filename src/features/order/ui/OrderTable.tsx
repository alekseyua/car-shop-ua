'use client';

import React from 'react'
import { useCartStore } from '../../cart/model/cart.store';
import { CartItem } from '../../cart/model/cart.types';
import Image from 'next/image';
import QuantitySelector from '@/src/shared/ui/QuantitySelector/QuantitySelector';
import { RemoveCartItemButton } from '../../cart/ui/RemoveCartItem';
import { ProductAvailabilityList } from '@/src/entities/product/ui/ProductAvailabilityList';
import { handleAddToCart } from '../../cart/model/cart.actions';
import ProductAvailabilityStatus from '@/src/shared/ui/status/ProductAvailabilityStatus';

const OrderTable = () => {
  const { cartItems, changeQuantity, removeFromCart } = useCartStore();
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl">

      <h2 className="text-3xl font-bold mb-6 text-black">Найменування</h2>

    <div className='flex gap-4 flex-col'>
      {cartItems.map((item: CartItem)=>(
        <div key={item.itemNo} className='grid grid-cols-[100px_1fr_150px_110px] items-center gap-3 p-2 border-b-1'>
          <div className='rounded-md border border-gray'>
            <Image 
              src={'https://img2.ad.ua/imgs/' + item.imageUrl} 
              alt={'preview_'+item?.imageUrl?.split('/').pop()} 
              width={80}
              height={80}
              style={{width: '80px', height: '80px', objectFit: 'contain'}}/>
          </div>
          <div  className='text-black'>{item?.title}</div>
          <div>
            <div className='text-black text-[20px] font-bold text-nowrap'>{Number(item?.price).toFixed(2)} ₴</div>
            <ProductAvailabilityStatus
              status={item.statusDelivery}
            />
          </div>
          <div  className='text-black flex flex-col gap-2'>
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
    </div>
  )
}

export default OrderTable