"use client";

import { CITY_OFFICE, EMAIL_SERVICE, PHONE_SERVICE_1 } from "@/src/config";
import { useIfoDeliveryPay } from "../model/delivery-pay.store";
import { useState } from "react";

const paymentMethods = [
  {
    title: "Накладений платіж",
    content: (
      <p>
        Оплата при отриманні товару на складі перевізника. Оплата здійснюється
        після огляду замовлення. Є можливість сплатити готівкою або карткою.
        Зверніть увагу, що при замовленні накладеним платежем Вам доведеться
        сплатити комісію за пересилку коштів по тарифам перевізника. Послуга
        доставки коштів складає <strong>20 грн. + 2% від суми.</strong>
      </p>
    ),
  },
  {
    title: "Безготівковий розрахунок",
    content: (
      <div className="space-y-3">
        <p>
          <span className="font-semibold">1.</span> Оплата через сайт будь-якою
          карткою світу при оформленні замовлення.
        </p>
        <p>
          <span className="font-semibold">2.</span> Оплата на розрахунковий
          рахунок в ПриватБанку через касу банку, систему Приват24 або через
          термінал ПриватБанку.
        </p>
      </div>
    ),
  },
  {
    title: "Безготівковий розрахунок для юридичних осіб",
    content: (
      <p>
        Ми працюємо з юридичними особами по безготівковому розрахунку. Після
        оформлення замовлення наш менеджер, зручним для Вас способом, вишле
        рахунок, який Ви зможете оплатити з розрахункового рахунку Вашої фірми.
        При отриманні замовлення Ви отримаєте рахунок і видаткову накладну з
        печаткою. Зверніть увагу, ми не є платниками ПДВ.
      </p>
    ),
  },
  {
    title: "Готівкою",
    content: (
      <p>
        Для жителів міста {CITY_OFFICE} можлива оплата при отриманні замовлення
        у нас в офісі або при оформленні адресної доставки по місту.
      </p>
    ),
  },
];
const deliveryFaq = [
  {
    question:
      "Який у мене номер ТТН до замовлення? Підкажіть номер декларації.",
    answer: (
      <p>
        Після того, як замовлення відправлене, вам буде надіслано СМС з номером
        ТТН, щоб ви могли відстежити його на сайті компанії Нова пошта. Номер
        ТТН також відображається в вашому особистому кабінеті.
      </p>
    ),
  },
  {
    question:
      "Я отримав номер ТТН, але моє замовлення не відтворюється в особистому кабінеті на сайті Нової пошти.",
    answer: (
      <p>
        Ми відправляємо вам СМС одразу після передачі замовлення компанії Нова
        пошта. Його статус буде видно після того, як служба Нової пошти внесе
        цей номер до своєї бази даних.
      </p>
    ),
  },
  {
    question: "Куди звернутися, якщо є зауваження чи пропозиції до роботи?",
    answer: (
      <p>
        У нас для цього працює Команда турботи — люди, які завжди поруч, щоб
        вислухати, допомогти й знайти рішення без зайвих хвилювань. Телефонуйте
        за номером {PHONE_SERVICE_1} у робочі дні з 09:00 до 18:00. Також можна
        написати на пошту {EMAIL_SERVICE} — ми на зв’язку цілодобово.
      </p>
    ),
  },
  {
    question: "Скільки коштує доставка Новою поштою до мого населеного пункта?",
    answer: (
      <div className="space-y-3">
        <p>У відділення Нової пошти — 89 грн.</p>
        <p>
          Комісія за післяплату — за тарифами перевізника. За зручною для вас
          адресою кур'єром Нової пошти — 119 грн.
        </p>
        <p className="text-sm text-gray-500">
          Винятки стосуються лише габаритних товарів, таких як деякі деталі
          кузова, акумулятори, радіатори, автокрісла, мийки високого тиску тощо.
          Доставка цих товарів оплачується за тарифами Нової пошти, зокрема і
          комісія за перерахування грошових коштів по оплаті замовлення.
        </p>
      </div>
    ),
  },
];
const paymentFaq = [
  {
    question:
      "Для чого потрібен паспорт у разі оплати замовлення вартістю від 5 тис. грн післяплатою?",
    answer: (
      <p>
        Це пов’язано з вимогами законодавства України щодо фінансового
        моніторингу. Для окремих фінансових операцій передбачено вимоги до
        ідентифікації клієнта. Детальні умови визначаються Законом України №
        361-IX «Про запобігання та протидію легалізації (відмиванню) доходів,
        одержаних злочинним шляхом, фінансуванню тероризму та фінансуванню
        розповсюдження зброї масового знищення».{" "}
        <a
          href="https://zakon.rada.gov.ua/laws/show/361-IX"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
        >
          Ознайомитися із законом
        </a>
        .
      </p>
    ),
  },
  {
    question: "Який документ можна надати замість паспорта?",
    answer: (
      <div className="space-y-3">
        <p>Залежно від ситуації можна надати такі документи:</p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            Закордонний паспорт (за умови надання довідки про присвоєння ІПН).
          </li>
          <li>Тимчасове посвідчення громадянина України.</li>
          <li>
            Дозвіл на постійне проживання або дозвіл на довгострокове проживання
            на території України.
          </li>
          <li>Посвідчення біженця, видане в Україні.</li>
          <li>Посвідчення особи, яка потребує додаткового захисту.</li>
        </ul>
      </div>
    ),
  },
];
export function DeliveryPayContent() {
  const activeSection = useIfoDeliveryPay((state) => state.activeSection);
function FaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="py-1">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 rounded-lg py-4 text-left transition-colors hover:text-blue-700"
      >
        <span className="text-base font-semibold leading-6 text-gray-900">
          {question}
        </span>

        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pr-2 text-sm leading-7 text-gray-600 sm:pr-10">
            {children}
          </div>
        </div>
      </div>
    </li>
  );
}

function PaymentItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="py-1">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 rounded-lg py-4 text-left transition-colors hover:text-blue-700"
      >
        <span className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </span>

        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pr-2 text-sm leading-7 text-gray-600 sm:pr-10">
            {children}
          </div>
        </div>
      </div>
    </li>
  );
}

  switch (activeSection) {
    case "payment":
      return (
        <section>
          <h1 className="mb-4 text-lg font-bold">Оплата</h1>
          <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-4 sm:px-6">
            {paymentMethods.map((method) => (
              <PaymentItem key={method.title} title={method.title}>
                {method.content}
              </PaymentItem>
            ))}
          </ul>
        </section>
      );

    case "payment-faq":
      return (
        <section>
          <h1 className="mb-4 text-lg font-bold">
            Питання та відповіді про оплату
          </h1>
          <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-4 sm:px-6">
            {paymentFaq.map((item, index) => (
              <FaqItem key={index} question={item.question}>
                {item.answer}
              </FaqItem>
            ))}
          </ul>
        </section>
      );

    case "delivery":
      return (
        <section>
          <h1 className="mb-4 text-2xl font-bold">Доставка по Україні</h1>
          <p>
            Для доставки товарів по Україні ми користуємося послугами
            транспортної компанії «Нова Пошта» - доставляємо на відділення
            перевізника або кур'єром до дверей.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Замовлення на суму від 5000 грн., за умови попередньої оплати на
              розрахунковий рахунок, відправляються безкоштовно, за винятком
              великогабаритних товарів.
            </li>
            <li>
              Замовлення на суму менше 5000 грн. і замовлення накладеним
              платежем відправляються по Україні, відповідно до тарифів
              перевізника, за рахунок покупця.
            </li>
            <li>
              Замовлення до 200 грн. накладеним платежем не відправляються,
              тільки по повній передоплаті.
            </li>
          </ul>
        </section>
      );

    case "delivery-faq":
      return (
        <section className="w-full">
          <h1 className="mb-4 text-2xl font-bold">
            Питання та відповіді про доставку
          </h1>
          <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-4 sm:px-6">
            {deliveryFaq.map((item, index) => (
              <FaqItem key={index} question={item.question}>
                {item.answer}
              </FaqItem>
            ))}
          </ul>
        </section>
      );

    default:
      return null;
  }
}