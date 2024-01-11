import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Datagrid from "./Datagrid";
import {
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";
  import {

    MagnifyingGlassIcon,
    PlusCircleIcon 
  } from "@heroicons/react/24/outline";
  import { CheckIcon,XMarkIcon } from "@heroicons/react/24/solid";
  import useAuth from "../hooks/useAuth";
  import Alerta from "./Alerta";
export function ContentProd(props) {
    const {auth} = useAuth();
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [idusuario, setIdusuario] = useState(auth.id)
    const [rowData, setRowData] = useState([])
    const [alerta, setAlerta] = useState({})
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
     

        obtenerDatos();

    }, []);
  

    const [desplegableAgregarAbierto, setDesplegableAbierto] = useState(false);
const toggleDesplegable = () => {
    setDesplegableAbierto(!desplegableAgregarAbierto);
  };
 
  const obtenerDatos = async (e) => {
    const url = '/getProductos'
    const res = await clienteAxios.get(url)
    setRowData(res.data)
}
    const [colDefs, setColDefs] = useState([
        { headerName: "Nombre ", field: "nombre", sortable: true },
        { headerName: "Precio ", field: "precio", sortable: true },
        { headerName: "Stock ", field: "stock", sortable: true },
       
    ]);

    

    const resetForm = () => {
        setNombre(''),
            setPrecio(''),
            setStock('')
    }

    const {msg} = alerta
    const handleSubmitProd = async (e) => {
        e.preventDefault()
            
            try{
             
                const url = '/postProductos'
                const {data} = await clienteAxios.post(url, {nombre,precio,stock,idusuario })
                setAlerta({
                    msg:"Producto agregado exitosamente"
                   })
                obtenerDatos()
                   
                resetForm()
              }catch(error){
                
                setAlerta({
                    msg: error.response.data.msg,
                    error:true
                  })
             
              }
    
        
      };
      const onSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
      };
      
      const filteredRowData = rowData.filter(
        (row) =>
          row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
          
      );
    


    return (
        <>



    <Datagrid  onSearchTermChange={onSearchTermChange} filteredRowData={filteredRowData} columnDefs={colDefs} nombre={"Producto"} nomButton={"Agregar Producto"} desplegableAgregarAbierto={toggleDesplegable} />

    {desplegableAgregarAbierto && 
    (
        
        <form className="" onSubmit={handleSubmitProd}>
             
        <div className="fixed top-0 right-0 h-full w-[20rem] bg-white p-4 shadow">
              <Typography variant="h3"> Agregar Productos </Typography>
              {msg && <Alerta 
          alerta={alerta}/>}

              <Typography variant="h5" className='pt-5'> Nombre del producto </Typography>

          <div className="relative inline-block text-left pt-3 w-full">
        
          <Input  variant="outlined" label="Producto" placeholder="Producto" value={nombre} onChange={e => setNombre(e.target.value)}/>
          </div>
          <Typography variant="h5" className='pt-5'> Precio </Typography>
        <div className="relative inline-block text-left pt-3 w-full">
        
        <Input type="number" variant="outlined" label="Precio" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)}/>
          </div>

          <Typography variant="h5" className='pt-5 '> Stock </Typography>
        <div className="relative inline-block text-left pt-3 w-full">
        
        <Input type="number" variant="outlined" label="Stock" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
          </div>
          <div className="flex m-2 pt-5">
          <Button type="submit" className="flex items-end justify-center  " size="sm" color="green" >
        <CheckIcon strokeWidth={2} className="h-4 w-5 pr-2" /> Guardar
      </Button>
      <div className="flex pl-3">
      <Button  className="flex items-end justify-end w-full" size="sm" color="red" onClick={toggleDesplegable}>
        <XMarkIcon strokeWidth={2} className="h-4 w-5 pr-2" /> Cancelar
      </Button>
      </div>
     
          </div>
         
        </div>
        </form>)
    
}
   

        </>
    );
}