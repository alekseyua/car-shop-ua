'use client';

import { Link, usePathname } from '@/src/i18n/navigation'

const LanguageSwitcher = () => {
    const pathname = usePathname();
    return (
        <div className='flex flex-row gap-1'>
            <Link href={`/${pathname}`} className='bg-green-500 text-white px-2 py-1 rounded' locale='ua'>UA</Link>
            <Link href={`/${pathname}`} className='bg-blue-500 text-white px-2 py-1 rounded' locale='en'>EN</Link>
            <Link href={`/${pathname}`} className='bg-red-500 text-white px-2 py-1 rounded' locale='ru'>RU</Link>
        </div>
    )
}

export default LanguageSwitcher