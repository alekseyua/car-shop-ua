import React from 'react'
import CartTable from './CartTable'
import useModal from '@/src/hooks/use-modal';
import { useRouter } from '@/src/i18n/navigation';

const CartModal = () => {
    const { closeModal } = useModal();
    const route = useRouter();
  return (
    <div>
      <CartTable />
      <div className="h-[1px] w-full bg-gray-300 mt-5 mb-5"></div>
      <div className="flex justify-between gap-4">
        {/* continue shopping */}
        <button
          onClick={closeModal}
          className="
                                  w-full
                                  max-w-sm
                                  h-14
                                  mt-8
                                  bg-transparent
                                  text-black
                                  border
                                  rounded-lg
                                  font-semibold
                                  "
        >
          Продовжити покупки
        </button>

        {/* place an order */}
        <button
          onClick={()=>{
            route.push('/order');
            closeModal();
        }}
          className="
                                  max-w-sm
                                  w-full
                                  h-14
                                  mt-8
                                  bg-red-600
                                  text-white
                                  rounded-lg
                                  font-semibold
                                  "
        >
           Оформити замовлення
        </button>
      </div>
    </div>
  );
}

export default CartModal