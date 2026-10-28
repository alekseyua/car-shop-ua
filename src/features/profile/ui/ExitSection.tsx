const ExitSection = () => {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gray-50 px-6 py-12 text-gray-900">
      <div className="max-w-md text-center">
        {/* SVG illustration */}
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className="h-20 w-20"
            aria-hidden="true"
          >
            {/* Door */}
            <rect
              x="20"
              y="13"
              width="43"
              height="74"
              rx="5"
              fill="#FFFFFF"
              stroke="#2563EB"
              strokeWidth="3"
            />
            <path
              d="M30 87V23H63V87"
              fill="#DBEAFE"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="53" cy="55" r="2.5" fill="#2563EB" />

            {/* Heart */}
            <path
              d="M72 31C67 24 56 30 62 39L72 49L82 39C88 30 77 24 72 31Z"
              fill="#FCA5A5"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Sparkles */}
            <path
              d="M77 58V66M73 62H81"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M14 32V38M11 35H17"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          До нових зустрічей!
        </span>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">
          Ми сумуватимемо за вами 💙
        </h2>

        <p className="text-sm leading-6 text-gray-500 sm:text-base">
          Дякуємо, що були з нами! Сподіваємося, що вам усе сподобалося.
          Завітайте до нас знову — ми завжди раді вам!
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
          <span aria-hidden="true">💙</span>
          <span>Повертайтеся за новими покупками!</span>
        </div>
      </div>
    </div>
  );
};

export default ExitSection;
