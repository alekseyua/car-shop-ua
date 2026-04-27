import Image from 'next/image'
import Link from 'next/link';
import iconMts from '../../assets/icons/IconMts.svg';
import iconMail from '../../assets/icons/IconMail.svg';
import React from 'react'

const Contacts = () => {
  return (
    <div className='flex flex-col gap-2 '>
        <div className="flex items-center gap-1 text-sm">
            <Image src={iconMts} alt="mts icon" className='w-4 h-4 inline-block mr-1' />
            <Link href='tel:+380123456789'>+380123456789</Link>
        </div>
        <div className="flex items-center gap-1 text-sm">
            <Image src={iconMail} alt="mail icon" className='w-4 h-4 inline-block mr-1' />
            <Link href='mailto:info@carshop.ua'>info@carshop.ua</Link>
        </div>
        <div className="flex items-center gap-1 text-sm">
            <Image src={iconMail} alt="mail icon" className='w-4 h-4 inline-block mr-1' />
            <Link href='mailto:info@carshop.ua'>info@carshop.ua</Link>
        </div>
    </div>
  )
}

export default Contacts