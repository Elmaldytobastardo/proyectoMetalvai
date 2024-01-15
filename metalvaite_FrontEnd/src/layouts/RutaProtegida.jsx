
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { Spinner } from "@material-tailwind/react";
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {
  const {auth, cargando } = useAuth();
 


  if(cargando) return (  <div className='grid h-screen place-items-center'> 
  <Spinner className="h-12 w-12 " color="red" /> </div>)
 
  return (
    <> 

  {auth?.id? <Outlet/> : <Navigate to="/"/>}
    </>
  )
}

export default RutaProtegida