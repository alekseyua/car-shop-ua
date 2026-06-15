import { Container } from '@/src/shared/ui/layout/Container/Container'
import React from 'react'

const Footer = () => {
  return (
      <div className='bg-[#3c3f44] py-2 h-full mb-4'>
      <Container className='flex flex-row gap-3 px-[15px] pt-[5px] pb-[10px] justify-between flex-wrap'>
          <div className="flex flex-col gap-2">
              <div className="flex text-[#ffffffcc] text-xs">© 2024 CarShopUa. All rights reserved.</div>
              <div className="flex text-[#ffffffcc] text-xs">Privacy Policy | Terms of Service</div>
          </div>

          <div className="flex flex-col gap-2">
              <div className="flex text-[#ffffffcc] text-xs">Contact us:</div>
              <div className="flex text-[#ffffffcc] text-xs">Email: info@carshopua.com</div>
          </div>

          <div className="flex flex-col gap-2">
              <div className="flex text-[#ffffffcc] text-xs">Follow us:</div>
              <div className="flex text-[#ffffffcc] text-xs">Facebook | Twitter | Instagram</div>
          </div>  
          <div className="flex flex-col gap-2">
              <div className="flex text-[#ffffffcc] text-xs">Working hours:</div>
              <div className="flex text-[#ffffffcc] text-xs">Mon-Fri: 9am - 6pm</div>
          </div>
      </Container>
    </div>
  )
}

export default Footer