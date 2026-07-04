import React from 'react'
import { useProfileStore } from '../model/profile.store'

const listNav = [
  {
    id: 0,
    title: 'Order',
  },
  {
    id: 1,
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
    <div className="border-r border-black">
      <ul>
        {listNav.map( (ln) => (
          <li key={ln.id}
            className="
                      text-black 
                      cursor-pointer
                      hover:text-gray-500 
            "
            onClick={()=>setCurrentSection(ln.id)}
          >{ln.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default NavItems