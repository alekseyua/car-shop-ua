'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import IconLogo from "@/src/shared/assets/images/logo-bg.png"
import Image from 'next/image';

const Logo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/')}
      className='text-2xl font-bold text-black cursor-pointer'
    >
      <Image
        src={IconLogo}
        width={130}
        height={70}
        alt='logo'
        style={{
          width: '130px',
          height: '70px',
          objectFit: 'contain'
        }}
      />
    </div>
  )
}

export default Logo