import Link from 'next/link';
import React from 'react'
import NavSubMenu from './NavSubMenu';

interface Iprops {
    title: string; 
    path: string; 
    subMenu: {
        title: string;
        path: string;
    }[]
}

const NavItem = ({ title, path, subMenu }: Iprops) => {
  return (
      <div 
      className=" group flex-1 border-r border-[#ccc] p-4 text-[#000000e6] text-xs last:border-0 text-center hover:bg-[#ed1c24] hover:text-white cursor-pointer"
      >
          <Link className="w-full h-full flex items-center justify-center"
           href={path}>{title}</Link>
          <div className="absolute w-full border-t border-[#ed1c24] hidden group-hover:block z-10 left-0 top-full bg-[#c3c3c3] w-full shadow-lg ">
                {subMenu.map((child:{ title: string; path: string }, index: number) => (
                    <NavSubMenu key={index} {...child} />
                ))}
            </div> 
      </div>
  )
}

export default NavItem