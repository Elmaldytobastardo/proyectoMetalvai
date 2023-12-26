import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useState } from "react";
import clienteAxios from "../config/axios";
export function Content() {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [idusuario, setIdusuario] = useState('123')

    const resetForm = ()   =>{
        setNombre(''),
        setPrecio(''),
        setStock('')
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
            
            try{
             
                const url = '/postProductos'
                const {data} = await clienteAxios.post(url, {nombre,precio, stock,idusuario })
                console.log(data)  
                resetForm()
              
              }catch(error){
            console.log(error)
             
              }
    
        
      };


  return (
    <div className="w-72">
    <Card color="transparent" shadow={false } >
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}  >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nombre de producto
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Precio
          </Typography>
          <Input
           type="number"
            size="lg"
            placeholder="99999"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={precio}
            onChange={e => setPrecio(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Stock
          </Typography>
          <Input
          type="number"
            size="lg"
            placeholder="99999"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={stock}
            onChange={e => setStock(e.target.value)}
          />
        </div>
        <Button className="mt-6" fullWidth type="submit" >
          Registrar
        </Button>
      </form>
    </Card>
  
    </div>
  );
}