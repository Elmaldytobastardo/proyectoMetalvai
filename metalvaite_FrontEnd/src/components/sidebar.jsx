import React from "react";
import { NavLink,Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
 
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,

} from "@heroicons/react/24/solid";
import {
  TruckIcon ,

  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

export function SidebarWithBurgerMenu() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };


 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const {cerrarSesion} = useAuth()
  return (
    <>

<Card className=" hidden lg:block  w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
     
      <List>
      <NavLink
  to="/admin/dashboard"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
     
  Dashboard

        </ListItem>
        </NavLink>
        <NavLink
  to="/admin/producto"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
     
  Productos 

        </ListItem>
       </NavLink>
       <NavLink
  to="/admin/clientes"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Clientes
          
        </ListItem>
        </NavLink>
        <NavLink
  to="/admin/ventas"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
          <TruckIcon  className="h-6 w-6" />
          </ListItemPrefix>
          Ver ventas
        </ListItem>
        </NavLink>
      
        <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  } onClick={cerrarSesion}
>
         <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-red-500 " />
              </ListItemPrefix>
             <span className=" text-red-500 font-semibold">Cerrar Sesíon</span> 
            </ListItem>
            </NavLink>
      </List>
    </Card>
      <IconButton className="lg:hidden" variant="text" size="md" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
           
                 <NavLink
  to="/admin/dashboard"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
     
  Dashboard

        </ListItem>
        </NavLink>
        <NavLink
  to="/admin/producto"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
     
  Productos 

        </ListItem>
       </NavLink>
       <NavLink
  to="/admin/clientes"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Clientes
          
        </ListItem>
        </NavLink>
        <NavLink
  to="/admin/ventas"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  }
>
        <ListItem>
          <ListItemPrefix>
            <TruckIcon  className="h-5 w-5" />
          </ListItemPrefix>
          Ver ventas
        </ListItem>
        </NavLink>
        <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "bg-white" : isActive ? "bg-gray-200 rounded-xl" : ""
  } onClick={cerrarSesion}
>
            <ListItem >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-red-500 " />
              </ListItemPrefix>
             <span className=" text-red-500 font-semibold">Cerrar Sesíon</span> 
            </ListItem>
            </NavLink>
          </List>
          
        </Card>
      </Drawer>
    </>
  );
}