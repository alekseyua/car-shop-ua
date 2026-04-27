import { Link } from "@/src/i18n/navigation"
import { useTranslations } from "next-intl"

const TopNav = () => {
    const t = useTranslations('Header');
    return (
        <div className='justify-end flex items-center gap-3'>
            <Link href="/info/delivery">{t('Info.Delivery.title')}</Link>
            <Link href="/info/warranty">{t('Info.Warranty.title')}</Link>
            <Link href="/info/contacts">{t('Info.Contacts.title')}</Link>
            <Link className="iconcar-user" href="/login">{t('Login.title')}</Link>
        </div>
    )
}

export default TopNav;