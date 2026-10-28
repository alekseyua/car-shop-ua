const HistorySection = () => {
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
            <rect
              x="22"
              y="14"
              width="48"
              height="64"
              rx="7"
              fill="#DBEAFE"
              stroke="#2563EB"
              strokeWidth="3"
            />
            <path
              d="M33 32H58M33 43H53"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="65"
              cy="65"
              r="19"
              fill="#FFFFFF"
              stroke="#2563EB"
              strokeWidth="3"
            />
            <path
              d="M65 54V65L72 70"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M76 22L80 26L87 18"
              stroke="#60A5FA"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          У розробці
        </span>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">
          Історія замовлень
        </h2>

        <p className="text-sm leading-6 text-gray-500 sm:text-base">
          Ми працюємо над цим розділом, щоб ви могли зручно переглядати історію
          своїх замовлень. Зовсім скоро тут з’явиться більше можливостей!
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="M12 7V12L15 14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Незабаром буде доступно</span>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
