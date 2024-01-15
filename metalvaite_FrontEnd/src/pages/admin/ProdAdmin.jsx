import { useState } from 'react'
import {SidebarWithBurgerMenu} from '../../components/sidebar'
import { NavbarDefault } from '../../components/navbar'
import { ContentProd } from '../../components/contentProd'
import { Footer } from '../../components/footer'

function mainAdmin() {


  return (
    <>
     <div className='flex flex-col h-screen'>
    <NavbarDefault/>
    
    <div className="flex h-screen pt-5">
    <SidebarWithBurgerMenu/>
    <div className='pl-[2rem] '>
    <ContentProd/>
    </div>
    
    </div>
   
    <Footer/>
  
   

      </div>
    </>
  )
}

export default mainAdmin
