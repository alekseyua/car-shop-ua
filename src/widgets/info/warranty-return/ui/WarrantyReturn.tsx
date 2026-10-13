import React from 'react'

const WarrantyReturn = () => {
  return (
    <div>
      {/* информация */}
      <div className="flex items-center justify-between gap-4 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-sm leading-relaxed text-gray-800 sm:text-base">
          <span className="font-semibold">Зверніть увагу!</span> При поверненні
          та обміні товару транспортні витрати сплачує покупець. Якщо
          повернення/обмін здійснюється з вини наших менеджерів або
          пакувальників, то транспортні витрати оплачуємо ми.
        </p>

        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-yellow-600 text-yellow-700"
          aria-label="Важлива інформація"
          role="img"
        >
          <span className="text-lg font-bold leading-none">i</span>
        </div>
      </div>
      {/* Гарантія */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Гарантія
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Умови гарантійного обслуговування
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50/70 p-4 sm:p-5">
          <p className="text-sm leading-7 sm:text-base">
            Гарантія на товар надається строком на{" "}
            <strong className="text-gray-900">6 місяців</strong> або{" "}
            <strong className="text-gray-900">10 000 км</strong> (залежно від
            того, що настане раніше), за умови дотримання всіх правил
            установлення на СТО та експлуатації товару.
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900">
            Особливі умови гарантії
          </h3>
          <p className="text-sm leading-7 sm:text-base">
            На деякі групи товарів, зокрема BOSCH, KYB та інші, гарантія
            надається лише за умови встановлення на авторизованому або
            сертифікованому сервісі.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-900">
            Заміна супутніх деталей
          </h3>
          <p className="mb-3 text-sm leading-7 sm:text-base">
            На окремі запчастини гарантія надається за умови дотримання
            інтервалів заміни, а також одночасної заміни робочих рідин і
            пов’язаних деталей:
          </p>

          <ul className="flex flex-col gap-3">
            {[
              "Амортизатор + опора, пильники та відбійники.",
              "Гідравлічні деталі гальмівної системи + гальмівна рідина.",
              "Ремені ГРМ + ролики, охолоджувальна рідина та помпа (за потреби, за результатами діагностики).",
              "Рульова рейка або насос ГУР + робоча рідина ГУР.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 sm:text-base"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-sm leading-7 sm:text-base">
            Інтервали заміни запчастин зазначені в керівництві з обслуговування
            та ремонту вашого автомобіля.
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900">
            Розгляд гарантійного випадку
          </h3>
          <p className="text-sm leading-7 sm:text-base">
            Гарантійний випадок розглядається протягом 14 днів із моменту
            повернення товару за умови надання таких документів:
          </p>

          <ul className="mt-3 flex flex-col gap-3">
            {[
              "Акт рекламації — висновок про непрацездатність запчастини.",
              "Акт виконаних робіт із СТО з печаткою.",
              "Для електродеталей — висновок СТО про справність електросистеми з результатами комп’ютерної діагностики, фото, сканом коду помилки та іншими показниками.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 sm:text-base"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gray-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-yellow-600 text-yellow-700"
            aria-label="Важлива інформація"
            role="img"
          >
            <span className="text-lg font-bold leading-none">i</span>
          </div>
          <p className="text-sm leading-6 text-gray-800">
            <strong>Зверніть увагу!</strong> Додаткові витрати, пов’язані з
            доставкою, зняттям, установленням і ремонтом, не компенсуються
            гарантією.
          </p>
        </div>

        <p className="text-sm leading-7 sm:text-base">
          Якщо у вас виникли питання щодо гарантійного випадку, зверніться до
          наших менеджерів — вони допоможуть розібратися в усіх нюансах.
        </p>
      </section>

      {/* Повернення */}
      <section className="flex flex-col gap-5 border-t border-gray-200 pt-7">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 2v6h6" />
              <path d="M3.05 13A9 9 0 1 0 5.64 5.64L3 8" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Повернення
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Правила та порядок повернення товару
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
          <p className="text-sm leading-7 sm:text-base">
            Повернення товару можливе протягом 14 днів із моменту відвантаження
            нашим складом. Для цього необхідно зберегти цілісність упаковки та
            товарний вигляд запчастин.
          </p>
          <p className="mt-2 text-sm leading-7 sm:text-base">
            Товар можна повернути безпосередньо в нашому офісі або відправити
            транспортною компанією «Нова Пошта».
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900">
            Як повернути товар через «Нову Пошту»
          </h3>

          <ol className="flex flex-col gap-3">
            {[
              "Переконайтеся, що запчастини та упаковка не пошкоджені. Не заклеюйте коробку скотчем та іншими наклейками, не робіть на ній написів.",
              "Після оформлення заявки на повернення дочекайтеся, поки менеджер надішле дані для відправлення посилки.",
              "Після отримання товару наш склад перевірить цілісність упаковки, наявність усіх комплектуючих та відсутність слідів установлення й використання.",
              "Після перевірки товар повертається постачальнику, а покупцю здійснюється повернення коштів.",
            ].map((item, index) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 sm:text-base"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
                  {index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-yellow-600 text-yellow-700"
            aria-label="Важлива інформація"
            role="img"
          >
            <span className="text-lg font-bold leading-none">i</span>
          </div>
          <div className="text-sm leading-6 text-gray-800">
            <p>
              <strong>Важливо!</strong> На «Новій Пошті» повернення коштів не
              здійснюється. Не відправляйте товар накладеним платежем — ми не
              зможемо отримати таку посилку.
            </p>
            <p className="mt-2">
              Запчастини, привезені «під замовлення», не підлягають обміну та
              поверненню.
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-yellow-600 text-yellow-700"
            aria-label="Важлива інформація"
            role="img"
          >
            <span className="text-lg font-bold leading-none">i</span>
          </div>
          <p className="text-sm leading-6 text-gray-800">
            <strong>Зверніть увагу!</strong> При поверненні та обміні товару
            транспортні витрати сплачує покупець. Якщо повернення або обмін
            здійснюється з вини наших менеджерів чи пакувальників, транспортні
            витрати оплачуємо ми.
          </p>
        </div>
      </section>

      {/* Гарантії не підлягають */}
      <section className="flex flex-col gap-5 border-t border-gray-200 pt-7">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Гарантії не підлягають
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Випадки, на які гарантія не поширюється
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {[
            {
              title: "Витратні матеріали",
              text: "Матеріали для технічного обслуговування автомобіля: масла, фільтри, запобіжники, кліпси тощо.",
            },
            {
              title: "Запчастини електрообладнання",
              text: "Гарантія надається лише на встановлення та за умови попередньої діагностики електричної системи. Її несправність може спричинити вихід із ладу встановленої деталі.",
            },
            {
              title: "Механічні пошкодження",
              text: "Деталі, пошкоджені внаслідок ДТП або незадовільного стану дорожнього покриття.",
            },
            {
              title: "Порушення правил експлуатації",
              text: "Запчастини, використані не за призначенням або встановлені з порушенням правил монтажу.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 sm:p-5"
            >
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600 sm:text-base">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default WarrantyReturn