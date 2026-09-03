"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import iconMts from "../../assets/icons/IconMts.svg";
import iconMail from "../../assets/icons/IconMail.svg";

const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false);
    const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative text-white" ref={contactRef}>
      {/* Заголовок / свернутое состояние */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-120 flex items-center justify-between rounded-xl border-2 border-[#d0d0d0] px-2 py-1 text-left"
      >
        <div className="flex flex-col gap-1 min-w-0 truncate">
          <Link
            href="tel:+380997678929"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 text-[14px] hover:opacity-70"
          >
            <Image src={iconMts} alt="MTS" className="h-4 w-4 shrink-0" />
            <span>(099) 767-89-29</span>
          </Link>

          <Link
            href="tel:+380675481217"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 text-[14px] hover:opacity-70"
          >
            <Image src={iconMail} alt="phone" className="h-4 w-4 shrink-0" />
            <span>(067) 548-12-17</span>
          </Link>
        </div>

        {/* Стрелка */}
        <span
          className={`ml-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg width="16" height="20" viewBox="0 0 32 20" fill="none">
            <path
              d="M3 3L16 16L29 3"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Раскрываемая часть */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          
          /* MOBILE — как сейчас */
          ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }

          /* DESKTOP — поверх контента */
          absolute
          left-0
          right-0
          top-full
          z-150
        `}
      >
        <div className="overflow-hidden">
          <div className="mt-2 overflow-hidden rounded-xl bg-[#242424] shadow-2xl">
            {/* Заголовок */}
            <div className="border-b border-[#777] px-6 py-3">
              <h2 className="text-[16px] font-bold">Зв’язатися з нами</h2>
            </div>

            {/* График */}
            <div className="flex items-center justify-between border-b border-[#777] px-6 py-3">
              <span className="text-[12px]">Пн - Пт: 9:00-17:00</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#124c2c]">
                <span className="h-3 w-3 rounded-full bg-[#00d75b]" />
              </span>
            </div>

            {/* Телефоны */}
            <div className="flex flex-col gap-3 border-b border-[#777] px-6 py-3">
              <Link
                href="tel:+380990000000"
                className="flex items-center gap-2 text-[14px] hover:opacity-70"
              >
                <Image src={iconMts} alt="MTS" className="h-4 w-4" />
                (099) 000-00-00
              </Link>

              <Link
                href="tel:+380670000000"
                className="flex items-center gap-2 text-[14px] hover:opacity-70"
              >
                <Image src={iconMail} alt="phone" className="h-4 w-4" />
                (067) 000-00-00
              </Link>

              <Link
                href="tel:+380630000000"
                className="flex items-center gap-2 text-[14px] hover:opacity-70"
              >
                <span className="flex h-4 w-4 items-center justify-center text-sm">
                  ◉
                </span>
                (063) 000-00-00
              </Link>

              {/* <Link
                href="tel:+380443558490"
                className="flex items-center gap-4 text-[21px] hover:opacity-70"
              >
                <span className="flex h-8 w-8 items-center justify-center text-2xl">
                  ☎
                </span>
                (044) 355-84-90
              </Link> */}
            </div>

            {/* Мессенджеры */}
            <div className="flex justify-around border-b border-[#777] px-4 py-5">
              <Link
                href="https://t.me/"
                target="_blank"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#229ed9]"
              >
                <span className="text-sm">➤</span>
              </Link>

              <Link
                href="viber://chat"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#7950a5]"
              >
                <span className="text-sm">☎</span>
              </Link>

              <Link
                href="https://wa.me/380997678929"
                target="_blank"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#20c968]"
              >
                <span className="text-sm">◔</span>
              </Link>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col gap-3 px-4 py-2">
              <button
                type="button"
                className="h-12 w-full rounded-xl bg-[#f51d25] text-[12px] font-bold"
              >
                Замовити дзвінок
              </button>

              <button
                type="button"
                className="h-12 w-full rounded-xl bg-[#f51d25] text-[12px] font-bold"
              >
                Замовити по VIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
