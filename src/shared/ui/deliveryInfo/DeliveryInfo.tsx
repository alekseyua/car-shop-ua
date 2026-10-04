"use client";

import Image from 'next/image';
// import {
//   MapPin,
//   Truck,
//   WalletCards,
//   ShieldCheck,
//   MoveUpDown,
//   ChevronRight,
// } from "lucide-react";
import mapPin from '../../../shared/assets/icons/mapPin.svg'
import truck from '../../../shared/assets/icons/truck.svg';
import novaPost from '../../../shared/assets/icons/novaPost.svg';
import wallet from '../../../shared/assets/icons/wallet.svg';
import shield from '../../../shared/assets/icons/shield.svg';

const DeliveryInfo = () => {
  return (
    <div className="w-full max-w-[812px] rounded-[12px] border border-[#d1d1d1] bg-white px-[15px] py-[28px] text-[#292929]">
      {/* Самовивіз */}
      {/* <section className="border-b border-[#d9d9d9] pb-[28px]">
        <div className="flex gap-7">
            <Image 
                src={mapPin}
                alt='map-pin'
                className='w-7 h-7'
            />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-bold">
                Самовивіз з магазину
              </h3>

              <span className="shrink-0 rounded-[13px] border-2 border-[#3b3b3b] px-[7px] py-[7px] text-base leading-[27px]">
                Безкоштовно
              </span>
            </div>

            <div className="mt-[10px] text-base leading-[34px] text-[#777]">
              Київ
            </div>
          </div>
        </div>
      </section> */}

      {/* Доставка */}
      <section className="border-b border-[#d9d9d9] py-[28px]">
        <div className="flex gap-[28px]">
          {/* <Truck size={46} strokeWidth={2} className="mt-[2px] shrink-0" /> */}
          <Image src={truck} alt="truck" className="w-7 h-7" />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-[34px]">Доставка</h3>

            <div className="mt-[28px] space-y-[16px]">
              <DeliveryRow text="На склад «Нової Пошти»" />

              <DeliveryRow text="На поштомат «Нової Пошти»" />
            </div>

            <button
              type="button"
              className="
                mt-[12px] flex items-center gap-[4px] 
                text-sm leading-[30px] text-[#2864c7] transition-colors 
                hover:text-[#174b9d] hover:cursor-pointer
                "
            >
              детальніше
              {/* <ChevronRight size={25} strokeWidth={2} /> */}
            </button>
          </div>
        </div>
      </section>

      {/* Оплата */}
      <section className="border-b border-[#d9d9d9] py-[28px]">
        <div className="flex gap-[28px]">
          {/* <WalletCards
            size={46}
            strokeWidth={2}
            className="mt-[2px] shrink-0"
          /> */}
          <Image src={wallet} alt="icon wallet" className="w-7 h-7" />

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-[34px]">Оплата</h3>

            {/* Payment logos */}
            <div className="mt-[14px] flex items-center gap-[12px]">
              <span className="text-lg font-black italic tracking-[-2px] text-[#143fc4]">
                VISA
              </span>

              <span className="relative flex h-[15px] w-[25px] items-center justify-center">
                <span className="absolute left-0 h-[15px] w-[15px] rounded-full bg-[#ed1b2f]" />
                <span className="absolute right-0 h-[15px] w-[15px] rounded-full bg-[#f79e1b] opacity-95" />
              </span>

              <span className="text-lg font-medium tracking-[-1.5px] text-black">
                Pay
              </span>

              <span className="flex items-center text-lg tracking-[-1px]">
                <span className="font-bold text-[#4285f4]">G</span>
                <span className="ml-[3px] text-[#444]">Pay</span>
              </span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-[#19763d] bg-[#092b16] text-xs font-medium text-white">
                24
              </span>
            </div>

            <p className="mt-[8px] max-w-[650px] text-sm text-[#777]">
              Накладений платіж, Предоплата на картку/ рахунок. Оплата готівкою.
              Оплата на сайті карткою Visa/MasterCard,{" "}
              <button
                type="button"
                className="text-[#2864c7] hover:text-[#174b9d] hover:cursor-pointer"
              >
                детальніше →
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Гарантія */}
      <section className="pt-[28px]">
        <div className="flex gap-7">
          {/* <ShieldCheck
            size={46}
            strokeWidth={2}
            className="mt-[2px] shrink-0"
          /> */}
          <Image src={shield} alt="icon shield" className="w-7 h-7" />

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold">Гарантія</h3>

            <p className="mt-[10px] text-sm text-[#777]">
              Обмін/повернення товару протягом 14 днів,{" "}
              <button
                type="button"
                className="text-[#2864c7] hover:text-[#174b9d] hover:cursor-pointer"
              >
                детальніше →
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

type DeliveryRowProps = {
  text: string;
};

const DeliveryRow = ({ text }: DeliveryRowProps) => {
  return (
    <div className="flex items-center gap-[14px] flex-wrap justify-between">
      {/* <MoveUpDown
        size={32}
        strokeWidth={3}
        className="shrink-0 text-[#ed1b2f]"
      /> */}
      <div className="flex gap-2">
        <Image src={novaPost} alt="icon nova post" className="w-7 h-7" />

        <span className="min-w-0 flex-1 text-sm leading-[34px] text-[#777]">
          {text}
        </span>
      </div>

      <button
        className="
            shrink-0 rounded-[13px] border-2 border-[#3b3b3b] 
            px-[6px] py-[3px] 
            text-sm leading-[27px] text-[#3b3b3b] align-end
            hover:cursor-pointer
            "
      >
        Тариф перевізника
      </button>
    </div>
  );
};

export default DeliveryInfo;
