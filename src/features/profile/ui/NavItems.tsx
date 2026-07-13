'use client';

import React from 'react'
import { useProfileStore } from '../model/profile.store'
import { handleLogout } from '@/src/processes/logout/model/logout';

const listNav = [
  {
    id: 0,
    title: 'Order',
  },
  {
    id: 1,
    title: 'History order',
  },
  {
    id: 2,
    title: 'Edit profile'
  },
  {
    id:10,
    title: 'Exit'
  },
]

const NavItems = () => {
  const { setCurrentSection } = useProfileStore();

  return (
    <div className="border-r border-gray-500">
      <ul>
        {listNav.map( (ln) => (
          <li key={ln.id}
            className="
                      text-black 
                      cursor-pointer
                      hover:text-gray-500 
            "
            onClick={()=>{
              if(ln.id === 10){
                handleLogout();
                return;
              }
              setCurrentSection(ln.id)
            }}
          >{ln.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default NavItems