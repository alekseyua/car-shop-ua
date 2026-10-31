"use client";

import React, { useEffect } from "react";
import { useProfileStore } from "../model/profile.store";
import { handleLogout } from "@/src/processes/logout/model/logout";
import { useRouter } from "@/src/i18n/navigation";
import { useAuthStore } from "../../auth-by-email/model/auth.store";
import { useOrderStore } from "../../order/model/useOrderStore";

const listNav = [
  { id: 0, title: "Мої замовлення" },
  { id: 1, title: "Історія замовлень" },
  { id: 2, title: "Редагувати профіль" },
  { id: 10, title: "Вийти" },
];

const NavItemsProfile = () => {
  const { currentSection, setCurrentSection } =
    useProfileStore();
  const getListMyOrders = useOrderStore((s) => s.getListMyOrders);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const route = useRouter();
  const accessToken = useAuthStore(s=>s.accessToken);
  console.log({ accessToken });
  useEffect(() => {
    setCurrentSection(0);
  }, [setCurrentSection]);

  useEffect(() => {
    if (!isAuthInitialized || currentSection !== 0) return;
    void getListMyOrders();
  }, [isAuthInitialized, currentSection, getListMyOrders]);

  return (
    <nav className="w-full border-r border-gray-200 pr-4">
      <ul className="flex flex-col gap-1">
        {listNav.map((item) => {
          const isActive = currentSection === item.id;
          const isExit = item.id === 10;

          return (
            <li
              key={item.id}
              className={`${
                isExit ? "mt-5 border-t border-gray-200 pt-4" : ""
              }`}
            >
              <button
                type="button"
                onClick={async () => {
                  setCurrentSection(item.id);
                  if (isExit) {
                    await handleLogout();
                    route.push("/");
                    return;
                  }

                  // setCurrentSection(item.id);
                }}
                className={`
            flex w-full items-center rounded-lg px-4 py-3
            text-left text-sm font-medium
            transition-colors duration-200
            ${
              isExit
                ? "border-l-4 border-transparent text-red-600 hover:bg-red-50 hover:text-red-700 hover:cursor-pointer"
                : isActive
                  ? "border-l-4 border-black bg-gray-100 text-black"
                  : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-black hover:cursor-pointer"
            }
          `}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavItemsProfile;
