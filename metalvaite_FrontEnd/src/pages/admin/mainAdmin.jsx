import { useState } from 'react'
import {SidebarWithBurgerMenu} from '../../components/sidebar'
import { NavbarDefault } from '../../components/navbar'
import { Content } from '../../components/content'
import { Footer } from '../../components/footer'

function mainAdmin() {


  return (
    <>
     <div className='flex flex-col h-screen'>
    <NavbarDefault/>
    
    <div className="flex pt-5 ">
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
