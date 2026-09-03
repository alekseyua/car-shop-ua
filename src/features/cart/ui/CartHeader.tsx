'use client';

import Image from 'next/image'
import iconCartWhite from "../../../shared/assets/icons/cartWhite.svg";
import iconCartBlack from "../../../shared/assets/icons/cartBlack.svg";
import { useTranslations } from 'next-intl';
import { useCartStore } from '../model/cart.store';
import { CartItem } from '../model/cart.types';
import { useRouter } from '@/src/i18n/navigation';

const getTotalPrice = (cart: CartItem[]) => {
  const total = cart.reduce((acc: number, cur: CartItem ) => {
    return acc += cur.price * cur.quantity
  }, 0)
  return total;
}

interface IProps {
  colorIcon: 'white' | 'black';
}

const CartHeader = ({colorIcon='white'}:IProps) => {
  const router = useRouter();
  const t = useTranslations('Header');
  const { cartItems } = useCartStore();
  const count = cartItems.length;
  const total = getTotalPrice(cartItems).toFixed(2);

  return (
    <div className="flex gap-2 sm:self-start self-center">
      {/* todo:
        1) add on click to open cart modal
        2) add real data from cart state
        3) add dropdown with cart items on hover
      */}
      <div className="flex relative" onClick={() => router.push("/order")}>
        <Image
          src={colorIcon === "white" ? iconCartWhite : iconCartBlack}
          alt="icon cart"
          width={44}
          height={44}
          className="sm:w-11 sm:h-11 w-8 h-8"
        />
        {!!count && (
          <div
            className="flex absolute sm:right-2 sm:-top-2 text-xs 
          rounded-full w-5 h-5 items-center justify-center text-white  
          shadow-[0_0_0_1px_#ffffff] bg-[#f5222d]
          -top-1.5
          -right-2
          "
          >
            {count}
          </div>
        )}
      </div>
      <div className="flex-col hidden md:flex">
        <p className="text-white text-sm">{t("cart.label")}</p>
        <p className="text-white text-sm font-bold">
          {t("cart.summary", { count, total })}
        </p>
        {!!count && (
          <button
            className="text-xs text-white active:scale-95 hover:bg-red-600 transition-colors duration-200 
            rounded bg-[#ed1c24] mt-1 py-[2px] px-2
            
            "
            onClick={() => router.push("/order")}
          >
            {t("cart.button.title")}
          </button>
        )}
      </div>
    </div>
  );
}

export default CartHeader