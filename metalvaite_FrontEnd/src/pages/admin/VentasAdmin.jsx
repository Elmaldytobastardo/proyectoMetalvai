import { useState } from 'react'
import {SidebarWithBurgerMenu} from '../../components/sidebar'
import { NavbarDefault } from '../../components/navbar'
import { ContentVentas } from '../../components/ContentVentas'
import { Footer } from '../../components/footer'

function VentasAdmin() {


  return (
    <>
     <div className='flex flex-col h-screen'>
    <NavbarDefault/>
    
    <div className="flex h-screen pt-5">
    <SidebarWithBurgerMenu/>
    <div className='pl-[2rem] '>
    <ContentVentas/>
    </div>
    
    </div>
   
    <Footer/>
  
   

      </div>
    </>
  )
}

export default VentasAdmin
