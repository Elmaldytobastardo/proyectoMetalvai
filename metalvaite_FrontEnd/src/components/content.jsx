import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
export function Content() {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [idusuario, setIdusuario] = useState('123')
    const [datos, setDatos] = useState([])

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

      const obtenerDatos = async (e) =>{
        const url = '/getProductos'
          const res = await clienteAxios.get(url)
       
          setDatos(res.data.rows)
          console.log(datos)
      }


  return (
    <>
     
  
  
    </>
  );
}