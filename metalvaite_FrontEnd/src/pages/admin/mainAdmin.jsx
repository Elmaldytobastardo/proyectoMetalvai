import { useState, useEffect } from 'react'
import clienteAxios from '../../config/axios'
import {SidebarWithBurgerMenu} from '../../components/sidebar'
import { NavbarDefault } from '../../components/navbar'
import { Content } from '../../components/content'
import { Footer } from '../../components/footer'
import sendNotification from '../../components/notificaciones'
function mainAdmin() {
 
 


  return (
    <>
   
     <div className='flex flex-col h-screen'>
    <NavbarDefault/>
    
    <div className="flex sm:pl-4 md:pl-4 lg:pl-0 pt-5 ">
    <SidebarWithBurgerMenu/>
    <div className='pl-[1rem] '>
    <Content/>
    </div>
    
    </div>
   
    <Footer/>
  
   

      </div>
    </>
  )
}

export default mainAdmin
