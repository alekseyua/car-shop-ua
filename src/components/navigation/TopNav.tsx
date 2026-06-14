
'use client';

import { getMe } from "@/src/features/auth-by-email/api/api";
import { useAuthStore } from "@/src/features/auth-by-email/model/store";
import { Link } from "@/src/i18n/navigation"
import { useTranslations } from "next-intl"
import { useEffect } from "react";

const TopNav = () => {
    const t = useTranslations('Header');
    const { user } = useAuthStore();
    useEffect(() => {
        getMe();
    }, []);
    console.log("TopNav user:", useAuthStore());
    return (
        <div className='justify-end flex items-center gap-3'>
            <Link href="/info/delivery">{t('Info.Delivery.title')}</Link>
            <Link href="/info/warranty">{t('Info.Warranty.title')}</Link>
            <Link href="/info/contacts">{t('Info.Contacts.title')}</Link>
            {user ? (
                <Link className="iconcar-user" href="/profile">
                    {user.email.slice(0,5) + '...'}
                </Link>
            ) : (
                <Link className="iconcar-user" href="/login">
                    {t('Login.title')}
                </Link>
            )}
        </div>
    )
}

export default TopNav;