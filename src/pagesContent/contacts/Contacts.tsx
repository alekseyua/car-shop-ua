"use client";
import {
  BreadcrumbItem,
  useBreadcrumbStore,
} from "@/src/shared/stores/breadcrumbs/breadcrumbs.store";
import ContactContent from "@/src/widgets/info/Contact/ContactContext";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const ContactsInfo = () => {
  const t = useTranslations("Header");
  const { setBreadcrumbItems, resetBreadcrumbItems } = useBreadcrumbStore();
  useEffect(() => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        title: "Контакти",
        href: "",
      },
    ];
    setBreadcrumbItems(breadcrumbs);
    return () => resetBreadcrumbItems();
  }, [setBreadcrumbItems, resetBreadcrumbItems]);
  return (
    <div className="p-3 sm:p-4">
      <h1 className="text-lg font-bold sm:text-xl">
        {t("Info.Contacts.title")}
      </h1>
      <ContactContent />
    </div>
  );
};

export default ContactsInfo;
