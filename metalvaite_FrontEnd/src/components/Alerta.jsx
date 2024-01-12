import { Alert, Button, Typography } from "@material-tailwind/react";
import { CheckIcon,XMarkIcon  } from "@heroicons/react/24/solid";
import {useState} from "react";
const Alerta = (props) => {
  
  const [open, setOpen] = useState(props.open);
  
  setTimeout(() => {
    setOpen(false)
    return 
    console.log("hola bebe")
  }, "1000");
console.log(open)
  return (
    <>
     {!open && (
        <>
          
        </>
      )}
          
        
          <Alert className={`${props.alerta.error ? 'bg-red-500 text-center  ' 
      
      : '  bg-green-500   '}
       `}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        
       open={open}
      >

        {props.alerta.msg}
        
        </Alert>
       
       
        
        </>
    )
  }
  
  export default Alerta