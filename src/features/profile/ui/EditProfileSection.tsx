import { LinkGoogleButton } from "../../auth-by-email/ui/LinkGoogleButton";

const EditProfileSection = () => {
  return (
    <div className="flex flex-col min-h-[400px] items-center justify-center rounded-2xl bg-gray-50 px-6 py-12 text-gray-900">
      <LinkGoogleButton />
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
            {/* Profile card */}
            <rect
              x="15"
              y="18"
              width="56"
              height="64"
              rx="9"
              fill="#FFFFFF"
              stroke="#2563EB"
              strokeWidth="3"
            />

            {/* Avatar */}
            <circle
              cx="43"
              cy="38"
              r="10"
              fill="#DBEAFE"
              stroke="#2563EB"
              strokeWidth="2.5"
            />
            <path
              d="M26 63C27 54 34 50 43 50C52 50 59 54 60 63"
              fill="#DBEAFE"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Edit pencil */}
            <path
              d="M59 67L76 50L85 59L68 76L57 79L59 67Z"
              fill="#60A5FA"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M72 54L81 63"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
          У розробці
        </span>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">
          Редагування профілю
        </h2>

        <p className="text-sm leading-6 text-gray-500 sm:text-base">
          Ми працюємо над цим розділом, щоб ви могли легко редагувати свої
          особисті дані та налаштування облікового запису. Зовсім скоро ця
          можливість стане доступною!
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

export default EditProfileSection;
