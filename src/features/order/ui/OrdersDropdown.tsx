"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Package,
  Truck,
} from "lucide-react";

import { Link, useRouter } from "@/src/i18n/navigation";
import { useOrderStore } from "../model/useOrderStore";
import { getOrderStatusLabel } from "@/src/shared/libs/helpers";

const OrdersDropdown = () => {
  const router = useRouter();

  const listMyOrders = useOrderStore((state) => state.listMyOrders);

  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownTop, setDropdownTop] = useState(0);

    const handleToggleOrders = () => {
      if (!isOrdersOpen && dropdownRef.current) {
        const isMobile = window.matchMedia("(max-width: 500px)").matches;

        const rect = dropdownRef.current.getBoundingClientRect();
        if (isMobile) {
          setDropdownTop(rect.bottom + 8);
        }else {
            setDropdownTop(rect.bottom - 100);

        }

      }

      setIsOrdersOpen((prev) => !prev);
    };
  const activeOrdersCount = listMyOrders.filter(
    (order) => order.status !== "DELIVERED" && order.status !== "CANCELLED",
  ).length;

  // Закрытие при клике за пределами dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOrdersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Переход к заказам
  const handleNavigateToOrders = (orderId?: number) => {
    setIsOrdersOpen(false);

    if (orderId) {
      router.push(`/profile#${orderId}`);
    } else {
      router.push("/profile");
    }
  };

  if(!listMyOrders.length) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Основная кнопка */}
      <div className="flex items-center rounded-xl bg-white border border-slate-300 shadow-sm hover:border-slate-400 transition-all focus-within:ring-2 focus-within:ring-red-500/20">
        <Link
          href="/profile"
          className="flex items-center gap-2 px-3.5 py-2.5 text-slate-800 font-semibold text-sm hover:text-red-600 transition-colors rounded-l-xl focus:outline-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <Package className="w-4 h-4 text-slate-700" />

            {activeOrdersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full border-2 border-white animate-pulse">
                {activeOrdersCount}
              </span>
            )}
          </div>

          <span className="hidden sm:inline tracking-tight">Замовлення</span>
        </Link>

        <div className="h-5 w-px bg-slate-200" />

        <button
          type="button"
          //   onClick={() => setIsOrdersOpen((prev) => !prev)}
          onClick={handleToggleOrders}
          aria-label="Відкрити список останніх замовлень"
          aria-expanded={isOrdersOpen}
          className="px-2 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors rounded-r-xl cursor-pointer"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOrdersOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOrdersOpen && (
        <div
          style={{
            top: dropdownTop,
          }}
          className="
                fixed
                left-0
                right-0
                top-[var(--orders-dropdown-top,100px)]
                w-full
                rounded-b-2xl
                bg-white
                shadow-xl
                border border-slate-100
                z-50
                overflow-hidden
                animate-in fade-in zoom-in-95 duration-150

                min-[500px]:absolute
                min-[500px]:left-auto
                min-[500px]:right-0
                min-[500px]:top-auto
                min-[500px]:mt-2
                min-[500px]:w-96
                min-[500px]:rounded-2xl
                "
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="hidden sm:block font-bold text-slate-900 text-sm">
                Останні замовлення
              </span>
              <span className="sm:hidden block font-bold text-slate-900 text-sm">
                Замовлення
              </span>

              {activeOrdersCount > 0 && (
                <span className="bg-red-50 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-100">
                  {activeOrdersCount} активні
                </span>
              )}
            </div>

            <Link
              href="/profile"
              onClick={() => setIsOrdersOpen(false)}
              className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1"
            >
              <span>Всі замовлення</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Orders list */}
          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {listMyOrders.length > 0 ? (
              listMyOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleNavigateToOrders(order.id)}
                  className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                      № {order.orderNumber}
                    </span>

                    {order.status === "PROCESSING" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3 animate-spin" />
                        {getOrderStatusLabel(order.status)}
                      </span>
                    )}

                    {order.status === "SHIPPED" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <Truck className="w-3 h-3" />
                        {getOrderStatusLabel(order.status)}
                      </span>
                    )}

                    {order.status === "DELIVERED" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {getOrderStatusLabel(order.status)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {new Date(order.createdAt).toLocaleString("uk-UA")}
                    </span>

                    <span className="font-semibold text-slate-900 text-xs">
                      {order.totalPrice.toLocaleString("uk-UA")} ₴
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 px-4 text-center text-sm text-slate-400">
                У вас поки немає замовлень
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => handleNavigateToOrders()}
              className="w-full text-center text-xs font-semibold text-slate-700 hover:text-red-600 py-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              Перейти до кабінету замовлень →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersDropdown;
