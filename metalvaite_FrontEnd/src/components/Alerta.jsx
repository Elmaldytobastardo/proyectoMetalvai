import { Alert } from "@material-tailwind/react";
const Alerta = ({alerta}) => {
    return (
      <Alert className={`${alerta.error ? 'bg-red-500 text-center ' 
      
      : '  bg-green-500 '}
       `}>
        {alerta.msg}
        </Alert>
    )
  }
  
  export default Alerta