import { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import clienteAxios from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
        
        try{
         
            const url = '/loginAdmin'
            const {data} = await clienteAxios.post(url, {email,password })

            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin/dashboard')
           
          }catch(error){
        console.log(error)
         
          }

    
  };




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
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
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
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <Button className="mt-6" fullWidth type="submit">
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
