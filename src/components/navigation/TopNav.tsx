"use client";

import { useAuthStore } from "@/src/features/auth-by-email/model/auth.store";
import useModal from "@/src/hooks/use-modal";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import iconEntries from "../../shared/assets/icons/iconEntries.svg";
import Image from "next/image";
import { getDataUser } from "@/src/features/auth-by-email/model/auth.action";

const TopNav = () => {
  const t = useTranslations("Header");
  const user = useAuthStore(s=>s.user);
  const closeModal = useModal(s=>s.closeModal);

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <div
      className="
        w-full
        justify-end min-[960px]:text-white min-[960px]:mt-0 min-[960px]:flex-row
        flex items-start gap-3 flex-col
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
      <Link
        href="/profile"
        className="hover:cursor-pointer hover:underline pl-4 "
        onClick={closeModal}
      >
        Замовлення
      </Link>
      {user ? (
        <Link
          className="block"
          href="/profile"
          onClick={closeModal}
        >
          <div className="rounded-lg bg-[#fef9c24f] p-4 min-[960px]:bg-transparent min-[960px]:p-0">
            {/* User */}
            <div className="border-b border-yellow-200 p-0 min-w-0 truncate min-[960px]:pb-3 min-[960px]:border-none">
              <div className="font-semibold block min-[960px]:hidden">Мій акаунт</div>

              <div className="mt-1 truncate text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </div>
            </div>

            {/* Menu */}
            <div className="py-2 block min-[960px]:hidden">
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
            <div className="border-t border-yellow-200 pt-2 block min-[960px]:hidden">
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
          className="block border-t border-gray-200 min-[960px]:border-0"
        >
          <div className=" rounded-lg  p-4 text-center min-[960px]:p-0 bg-[#fef9c24f] min-[960px]:bg-transparent">
            <div className="flex justify-center min-[960px]:justify-start min-[960px]:items-center">
              <Image
                src={iconEntries}
                alt="icon entries"
                className="w-5 h-5 min-[960px]:brightness-0 min-[960px]:invert"
              />
              <span className="block font-semibold">{t("Login.title")}</span>
            </div>

            <span className="mt-1 block w-full max-w-full whitespace-normal break-words text-sm text-gray-600 dark:text-gray-300 min-[960px]:hidden">
              Увійдіть, щоб зберегти кошик та бачити історію замовлень
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default TopNav;
