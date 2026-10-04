"use client";

import { Link, usePathname } from "@/src/i18n/navigation";
import { useBreadcrumbStore } from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";
import { useTranslations } from "next-intl";

const Breadcrumbs = () => {
  const t = useTranslations("breadcrumb");
  const pathname = usePathname();
  const items = useBreadcrumbStore((state) => state.items);
  return (
    <nav className="flex items-center gap-2 text-sm">
      {pathname !== "/" && <Link href="/">{t('home')}</Link>}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.title}-${index}`}
            className="flex items-center gap-2"
          >
            <span>/</span>

            {!isLast && item.href ? (
              <Link href={item.href}>{item.title}</Link>
            ) : (
              <span>{item.title}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
