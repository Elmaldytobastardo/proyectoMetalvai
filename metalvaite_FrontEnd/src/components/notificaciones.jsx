import clienteAxios from "../config/axios"
const sendNotification = async () => {
  
    const register = 
    await navigator.serviceWorker.register('/sw.js',{scope:'/admin'})
      
    const sub = await register.pushManager.subscribe({
      userVisibleOnly:true,
      applicationServerKey:`${import.meta.env.VITE_KEY_PUBLIC}`
    })
   
    const subscription = sub
    
    await clienteAxios.post('/activarNoti',{subscription})
  
  }

 
export default sendNotification