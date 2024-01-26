import {useEffect, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import clienteAxios from '../config/axios';
import { Switch, Typography } from "@material-tailwind/react";
const Notificaciones = () => {
  useEffect(() => {
   
    if ('Notification' in window) {
     
    }
  }, []);
  const [permisos, setPermisos] = useState(Notification.permission);
  const [activado, setActivado] = useState(false)
  const [activados, setActivados] = useState(false)
  const sendNotification = async () => {
    
    if ('Notification' in window) {
      Notification.requestPermission();
      // Pedir permisos al usuario
      Notification.requestPermission().then(async (permission)  => {
        if (permission === 'granted') {
          // Mostrar la notificación después de obtener permisos
          const register = 
          await navigator.serviceWorker.register('/sw.js',{scope:'/admin'})
            
          const sub = await register.pushManager.subscribe({
            userVisibleOnly:true,
            applicationServerKey:`${import.meta.env.VITE_KEY_PUBLIC}`
          })
         
          const subscription = sub
          
          await clienteAxios.post('/activarNoti',{subscription})
         
          
        }
      })
    }
    

    }
    const handleSwitchChange = () => {
      // Verificar si la verificación ha pasado antes de cambiar el estado del interruptor
      if (permisos == 'granted') {
        setActivados(true);
      } else {
        setActivados(false);
      }
    };
    
  return (
    <>
    <Toaster position="top-center" />
    {permisos === 'granted' ? (
      <>
       <div className='flex flex-col items-center'>
        <Typography>Notificaciones Activada</Typography>

        <Switch checked={true} onChange={handleSwitchChange} onClick={sendNotification}  />
        </div>
        </>
      ) : (
        <div className='flex flex-col items-center'>
           <Typography>Notificaciones Desactivadas</Typography>
         <Switch checked={activado}  onChange={handleSwitchChange}  onClick={sendNotification}  />
        
        </div>
      )}
    </>
  )
}

export default Notificaciones




 
