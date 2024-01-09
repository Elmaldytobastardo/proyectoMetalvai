
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {
  const {auth, cargando } = useAuth();
 
  console.log(auth)
 
  if(cargando) return 'cargando...'
 
  return (
    <> 

  {auth?.id? <Outlet/> : <Navigate to="/"/>}
    </>
  )
}

export default RutaProtegida