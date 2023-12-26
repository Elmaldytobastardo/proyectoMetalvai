import { useState } from 'react'
import DefaultSidebar from '../../components/sidebar'
import { NavbarDefault } from '../../components/navbar'
import { Content } from '../../components/content'
function mainAdmin() {


  return (
    <>
     <div className={`flex flex-col h-screen w-full m-5`}>
    <NavbarDefault/>
    
    <div className={"flex pt-5"}>
    <DefaultSidebar/>
    <div className='pl-[1rem]'>
    <Content/>
    </div>
    
    </div>
   
     
    
  
   

      </div>
    </>
  )
}

export default mainAdmin
