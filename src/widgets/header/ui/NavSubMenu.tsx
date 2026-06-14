import Link from 'next/link'
import React from 'react';

interface IProps {
    title: string;
    path: string;
}


const NavSubMenu = ({path, title}: IProps) => {
  return (
      <Link href={path} className="block w-text px-4 py-2 text-sm text-[#000000e6] border-b border-transparent hover:border-[#ed1c24]">{title}</Link>
  )
}

export default NavSubMenu