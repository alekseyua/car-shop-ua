import React from 'react'

const SearchModal = () => {
  return (
    <div className='flex flex-col w-[95vw] h-[85vh]'>
        <h2 className='text-xl font-bold mb-4 text-center text-[#333]'>Search Modal</h2>
        <input 
            type="text"
            placeholder="Search for parts..."
              className='border text-[#333] p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#3b79d5] focus:border-transparent'
            onChange={(e)=>console.log(e.target.value)}
        />
        
    </div>
  )
}

export default SearchModal