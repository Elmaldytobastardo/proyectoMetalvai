import {useEffect, useState} from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse 
} from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import Notificaciones from './notificaciones'

export function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false);
  const {auth} = useAuth();
  const [dato , setRowData] = useState([])
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
    obtenerDatos()
  }, []);
 

 
  const obtenerDatos = async (e) => {
    const id = auth.id
    const url = `/getProductos/${id}`
    const res = await clienteAxios.get(url)
    setRowData(res.data.rows)
    
}
 

 

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h2"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        Bienvenido {auth.nombre} 
      
      </Typography>
    </ul>
    
  );
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          MetalVai
        </Typography>
       
    

        <div className="hidden lg:block">{navList}</div>

        <div className="flex items-center gap-x-1">
        <Notificaciones/>
        </div>
      
      </div>
      <Collapse >
        <div className="container mx-auto">
          {navList}
         
        </div>
      </Collapse >
    </Navbar>
  );
}