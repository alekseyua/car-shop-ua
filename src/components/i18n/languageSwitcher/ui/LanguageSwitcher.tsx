"use client";

import { Link, usePathname } from "@/src/i18n/navigation";

const LanguageSwitcher = () => {
  const pathname = usePathname();

  const buttonClass =
    "flex h-6 w-6 items-center justify-center rounded text-xs font-semibold text-white";

  return (
    <div className="flex flex-row gap-1">
      <Link
        href={`/${pathname}`}
        className={`${buttonClass} bg-green-500`}
        locale="uk"
      >
        UA
      </Link>

      <Link
        href={`/${pathname}`}
        className={`${buttonClass} bg-blue-500`}
        locale="en"
      >
        EN
      </Link>

      <Link
        href={`/${pathname}`}
        className={`${buttonClass} bg-red-500`}
        locale="ru"
      >
        RU
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
