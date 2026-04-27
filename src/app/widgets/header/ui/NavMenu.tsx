import React from 'react'
import NavItem from './NavItem';
import { channel } from 'diagnostics_channel';

const navItems = [
    {
        title: 'catalog',
        path: '/catalog',
        subMenu: [
            { title: 'catalog item 1', path: '/catalog/item1' },
            { title: 'catalog item 2', path: '/catalog/item2' },
            { title: 'catalog item 3', path: '/catalog/item3' },
        ]
    },
    {
        title: 'about us',
        path: '/about',
        subMenu: [
            { title: 'about item 1', path: '/about/item1' },
            { title: 'about item 2', path: '/about/item2' },
            { title: 'about item 3', path: '/about/item3' },
        ]
    },
    {
        title: 'delivery',
        path: '/delivery',
        subMenu: [
            { title: 'delivery item 1', path: '/delivery/item1' },
            { title: 'delivery item 2', path: '/delivery/item2' },
            { title: 'delivery item 3', path: '/delivery/item3' },
        ]
    },
    {
        title: 'payment',
        path: '/payment',
        subMenu: [
            { title: 'payment item 1', path: '/payment/item1' },
            { title: 'payment item 2', path: '/payment/item2' },
            { title: 'payment item 3', path: '/payment/item3' },
        ]
    },
];

const NavMenu = () => {
  return (
      <div className="relative  flex flex-row w-full flex-wrap items-center bg-[#f7f7f7] justify-between rounded-md">
        {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
        ))}
    </div>
  )
}

export default NavMenu