"use client";

import {
  EMAIL_SERVICE,
  PHONE_SERVICE_1,
  PHONE_SERVICE_2,
  PHONE_SERVICE_3,
} from "@/src/config";
import {
  Mail,
  Megaphone,
  PhoneCall,
  ScanBarcode,
  Send,
  MessageCircle,
  AtSign,
} from "lucide-react";

const cardClass = "min-w-0 rounded-2xl bg-[#fafafa] p-5 sm:p-6 lg:p-7";

const titleClass = "mb-6 text-lg font-bold uppercase text-[#171717] sm:text-xl";

const contacts = [
  { icon: AtSign, value: PHONE_SERVICE_1, href: "tel:+38" + PHONE_SERVICE_1 },
  {
    icon: MessageCircle,
    value: PHONE_SERVICE_2,
    href: "tel:+38" + PHONE_SERVICE_2,
  },
  {
    icon: PhoneCall,
    value: PHONE_SERVICE_3,
    href: "tel:+380" + PHONE_SERVICE_1,
  },
  //   { icon: Phone, value: "(044) 355-84-90", href: "tel:+380443558490" },
  { icon: Mail, value: EMAIL_SERVICE, href: "mailto:" + EMAIL_SERVICE },
];

const schedule = [
  { day: "Пн - Пт", time: "9:00-19:00" },
  { day: "Сб", time: "10:00-15:00" },
  { day: "Нд", time: "вихідний" },
];

const ContactContent = () => {
  return (
    <section className="w-full border-t border-[#eeeeee] py-6">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 lg:px-6">
        {/* Контакти */}
        <div className={cardClass}>
          {" "}
          <h2 className={titleClass}>Контакти</h2>
          <div className="flex flex-col gap-6">
            {contacts.map(({ icon: Icon, value, href }) => (
              <a
                key={value}
                href={href}
                className="flex min-w-0 items-center gap-3 text-base text-[#303030] transition hover:text-red-600 sm:text-lg"
              >
                <Icon size={24} strokeWidth={2.3} className="shrink-0" />
                <span className="break-words">{value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* График работы */}
        <div className={cardClass}>
          <h2 className={titleClass}>Графік роботи</h2>

          <div className="flex flex-col gap-6">
            {schedule.map(({ day, time }) => (
              <div
                key={day}
                className="flex min-w-0 items-center gap-3 text-base text-[#555] sm:text-lg"
              >
                <span className="shrink-0">{day}</span>

                <span className="min-w-4 flex-1 border-b border-dashed border-[#dedede]" />

                <span className="w-[112px] shrink-0 text-[#444] sm:w-[135px]">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Адреса */}
        {/* <div className={cardClass}>
      <h2 className={titleClass}>Адреса</h2>

      <div className="space-y-5 text-base leading-relaxed text-[#626262] sm:text-lg">
        <p>вул. Старосільська 1У, м. Київ</p>
        <p>Київська область, Україна, 02125</p>
      </div>
    </div> */}

        {/* Мессенджеры и соцсети */}
        <div className={cardClass}>
          <h2 className={titleClass}>Месенджери</h2>

          <div className="mb-8 flex flex-wrap items-center gap-5 text-[#777]">
            <a
              aria-label="Telegram"
              className="transition hover:text-red-600"
              href="https://t.me/car_spare_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send size={38} fill="currentColor" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="Viber"
              className="transition hover:text-red-600"
            >
              <PhoneCall size={38} />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="transition hover:text-red-600"
            >
              <MessageCircle size={38} />
            </a>
          </div>

          {/* <h2 className={titleClass}>Ми в соціальних мережах</h2> */}

          {/* <div className="flex flex-wrap items-center gap-5 text-[#777]">
        <a href="#" aria-label="Facebook" className="transition hover:text-red-600">
          <FaFacebook size={42} fill="currentColor" />
        </a>
        <a href="#" aria-label="Instagram" className="transition hover:text-red-600">
          <FaInstagram size={42} strokeWidth={2.5} />
        </a>
      </div> */}
        </div>

        {/* Оставить запрос */}
        <div className={cardClass}>
          <h2 className={titleClass}>Залишити запит</h2>

          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              className="inline-flex max-w-full items-center gap-3 rounded-xl bg-[#3d3d3d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#252525] sm:text-base"
            >
              <ScanBarcode size={19} />
              <span>Замовити по VIN</span>
            </button>

            <button
              type="button"
              className="inline-flex max-w-full items-center gap-3 rounded-xl bg-[#3d3d3d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#252525] sm:text-base"
            >
              <PhoneCall size={19} />
              <span>Замовити дзвінок</span>
            </button>
          </div>
        </div>

        {/* Блок претензий */}
        <div className="min-w-0 rounded-2xl border-l-[3px] border-[#ff303b] bg-[#ffe3e4] p-5 sm:p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <Megaphone size={38} className="mt-1 shrink-0 text-[#b91c24]" />

            <div className="min-w-0">
              <p className="text-base leading-relaxed text-[#b91c24] sm:text-lg">
                У разі претензій щодо виконання замовлень клієнт може звернутися
                зі скаргами до керівництва компанії
              </p>

              <a
                href={"mailto:" + EMAIL_SERVICE + "?subject=Скарга"}
                className="mt-5 inline-flex max-w-full items-center justify-center rounded-xl bg-[#ff303b] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#e51f2a] sm:text-base"
              >
                Написати керівнику
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
