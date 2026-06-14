'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

const Logo = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/')}
      className='text-2xl font-bold text-black cursor-pointer'
    >Logo</div>
  )
}

export default Logo