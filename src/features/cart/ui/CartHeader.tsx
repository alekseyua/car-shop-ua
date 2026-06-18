'use client';

import Image from 'next/image'
import React from 'react'
import iconCart from '../../../shared/assets/icons/cart.svg';
import { useTranslations } from 'next-intl';
import { useCartStore } from '../model/store';
import { CartItem } from '../model/types';
import { useRouter } from 'next/navigation';

const getTotalPrice = (cart: CartItem[]) => {
  const total = cart.reduce((acc: number, cur: CartItem ) => {
    return acc += cur.price * cur.quantity
  }, 0)
  return total;
}

const CartHeader = () => {
  const router = useRouter();
  const t = useTranslations('Header');
  const { cartItems } = useCartStore();
  const count = cartItems.length;
  const total = getTotalPrice(cartItems).toFixed(2);
  console.log({cartItems})
  return (
    <div className='flex gap-2 self-start'>
      {/* todo:
        1) add on click to open cart modal
        2) add real data from cart state
        3) add dropdown with cart items on hover
      */}
      <div className="flex relative">
        <Image
          src={iconCart}
          alt="icon cart"
          width={44}
          height={44}
          style={{
            width: "44px",
            height: "44px",
          }}
        />
      {!!count && <div className="flex absolute right-2 -top-2 text-xs rounded-full w-5 h-5 items-center justify-center text-white  shadow-[0_0_0_1px_#ffffff] bg-[#f5222d]">{count}</div>}
      </div>
      <div className='flex flex-col'>
        <p className='text-white text-sm'>{t('cart.label')}</p>
        <p className='text-white text-sm font-bold'>{t('cart.summary', {count, total})}</p>
        {!!count && <button 
          className='text-xs text-white active:scale-95 hover:bg-red-600 transition-colors duration-200 rounded bg-[#ed1c24] mt-1 py-[2px] px-2'
          onClick={()=>router.push('/order')}
        >
          {t('cart.button.title')} 
        </button>}
      </div>
    </div>
  )
}

export default CartHeader