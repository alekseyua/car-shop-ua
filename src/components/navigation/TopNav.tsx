"use client";

import { getMe } from "@/src/features/auth-by-email/api/api";
import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import useModal from "@/src/hooks/use-modal";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import iconEntries from "../../shared/assets/icons/iconEntries.svg";
import Image from "next/image";

const TopNav = () => {
  const t = useTranslations("Header");
  const { user } = useAuthStore();
  const { closeModal } = useModal();
  useEffect(() => {
    getMe();
  }, []);

  return (
    <div
      className="
        sm:justify-end sm:text-white sm:mt-0 sm:flex-row
        flex items-start gap-3 flex-start flex-col
        min-w-0 truncate 
        text-black mt-3"
    >
      <Link
        href="/info/delivery"
        className="hover:cursor-pointer hover:underline  pl-4 "
        onClick={closeModal}
      >
        {t("Info.Delivery.title")}
      </Link>
      <Link
        href="/info/warranty"
        className="hover:cursor-pointer hover:underline pl-4 "
        onClick={closeModal}
      >
        {t("Info.Warranty.title")}
      </Link>
      <Link
        href="/info/contacts"
        className="hover:cursor-pointer hover:underline pl-4 "
        onClick={closeModal}
      >
        {t("Info.Contacts.title")}
      </Link>
      {user ? (
        <Link
          className="block w-full"
          href="profile"
          onClick={closeModal}
        >
          <div className="rounded-lg bg-[#fef9c24f] p-4 sm:bg-transparent sm:p-0">
            {/* User */}
            <div className="border-b border-yellow-200 p-0 min-w-0 truncate sm:pb-3 sm:border-none">
              <div className="font-semibold block sm:hidden">Мій акаунт</div>

              <div className="mt-1 truncate text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </div>
            </div>

            {/* Menu */}
            <div className="py-2 block sm:hidden">
              <div className="rounded-md px-2 py-2 hover:bg-[#fef9c24f]">
                Замовлення
              </div>

              <div className="rounded-md px-2 py-2 hover:bg-[#fef9c24f]">
                Куплені товари
              </div>

              <div className="rounded-md px-2 py-2 hover:bg-[#fef9c24f]">
                Переглянуті товари
              </div>

              <div className="rounded-md px-2 py-2 hover:bg-[#fef9c24f]">
                Обрані товари
              </div>

              <div className="rounded-md px-2 py-2 hover:bg-[#fef9c24f]">
                Гараж
              </div>

              <div className="rounded-md px-2 py-2 hover:bg-[#fef9c24f]">
                Особисті дані
              </div>
            </div>

            {/* Logout */}
            <div className="border-t border-yellow-200 pt-2 block sm:hidden">
              <button
                type="button"
                className="w-full rounded-md px-2 py-2 text-left text-red-600 hover:bg-red-100 hover:cursor-pointer"
              >
                Вийти
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href="/login"
          onClick={closeModal}
          className="block border-t border-gray-200 sm:border-0 w-full"
        >
          <div className=" rounded-lg  p-4 text-center sm:p-0 bg-[#fef9c24f] sm:bg-transparent">
            <div className="flex justify-center sm:justify-start sm:items-center">
              <Image
                src={iconEntries}
                alt="icon entries"
                className="w-5 h-5 sm:brightness-0 sm:invert"
              />
              <span className="block font-semibold">{t("Login.title")}</span>
            </div>

            <span className="mt-1 block w-full max-w-full whitespace-normal break-words text-sm text-gray-600 dark:text-gray-300 sm:hidden">
              Увійдіть, щоб зберегти кошик та бачити історію замовлень
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default TopNav;
