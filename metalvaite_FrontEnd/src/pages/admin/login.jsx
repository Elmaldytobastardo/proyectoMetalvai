import { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function Login() {


  return (
  
   
   <>
   <div className='grid h-screen place-items-center'>
    <div className='p-6 py-[6rem] border-solid border-2 rounded-2xl shadow-lg'>
    <Card color="transparent" shadow={false}>
      <Typography className='grid place-items-center' variant="h3" color="blue-gray">
        Iniciar Sesión
      </Typography>
      <Typography color="gray" className="grid place-items-center mt-4">
        Bienvenido al sistema de ventas METALVAI
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
      
          <Typography variant="h6" color="blue-gray" className="-mb-3">
             Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@gmail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button className="mt-6" fullWidth>
          Entrar
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
    </div>
    
     
    </div>
   </>
  )
}

export default Login
