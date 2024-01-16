import { useState } from 'react'
import {SidebarWithBurgerMenu} from '../../components/sidebar'
import { NavbarDefault } from '../../components/navbar'
import { Footer } from '../../components/footer'
import { ContentClie } from '../../components/ContentClie'


function ClienteAdmin() {


  return (
    <>
     <div className='flex flex-col h-screen'>
    <NavbarDefault/>
    
    <div className="flex h-screen pt-5">
    <SidebarWithBurgerMenu/>
    <div className='pl-[2rem] '>
    <ContentClie/>
    </div>
    
    </div>
   
    <Footer/>
  
   

      </div>
    </>
  )
}

export default ClienteAdmin
