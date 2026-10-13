"use client";

import { InfoSection, useIfoDeliveryPay } from "../model/delivery-pay.store";

const items: { title: string; id: InfoSection }[] = [
  {
    title: "Оплата",
    id: "payment",
  },
  {
    title: "Питання та відповіді про оплату",
    id: "payment-faq",
  },
  {
    title: "Доставка",
    id: "delivery",
  },
  {
    title: "Питання та відповіді про доставку",
    id: "delivery-faq",
  },
];

export function DeliveryPaySidebar() {
  const activeSection = useIfoDeliveryPay((state) => state.activeSection);
  const setActiveSection = useIfoDeliveryPay((state) => state.setActiveSection);

  return (
    <aside className="w-full min-w-0">
      <nav aria-label="Інформаційна навігація">
        <ul
          className="
            flex flex-row gap-2 overflow-x-auto pb-2
            scrollbar-thin scrollbar-thumb-gray-300
            lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0
          "
        >
          {items.map((item) => {
            const active = activeSection === item.id;

            return (
              <li key={item.id} className="shrink-0 lg:w-full">
                <button
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={`
                    block w-full whitespace-nowrap rounded-lg
                    px-4 py-3 text-left text-sm transition-colors
                    ${
                      active
                        ? "bg-gray-100 font-semibold text-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
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
    </aside>
  );
}
