import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Datagrid from "./Datagrid";
import toast, { Toaster } from 'react-hot-toast';
import {
    Typography,
    Button,
    Input,
  } from "@material-tailwind/react";
  import { CheckIcon,XMarkIcon,PencilIcon} from "@heroicons/react/24/solid";
  import useAuth from "../hooks/useAuth";
 

export function ContentProd(props) {
    const {auth} = useAuth();
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [stock_critico, setStock_Critico] = useState()
    const [idusuario, setIdusuario] = useState(auth.id)
    const [rowData, setRowData] = useState([])
    const [alerta, setAlerta] = useState({})
    const [searchTerm, setSearchTerm] = useState('');
    
    const [open, setOpen] = useState(true);
    
    
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
    setRowData(res.data.rows)
}


const handleCellEditingStopped =  async (event) => {
   try{
    const { id, nombre, precio,stock,stock_critico } = event.data;
      
                const url = `/uptProductos/${id}`

                const {data} = await clienteAxios.patch(url, {nombre,precio,stock,idusuario,stock_critico })
               
                obtenerDatos()
                resetForm()
                toast.success('Producto actualizado exitosamente');
              }catch(error){
                obtenerDatos()
                toast.error(`${error.response.data.msg}`);
             
              }
  
};



    const [colDefs, setColDefs] = useState([
        { headerName: "Nombre ", field: "nombre", sortable: true, editable:true },
        { headerName: "Precio ", field: "precio", sortable: true, editable:true, valueFormatter: (params) => {
         
          return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(params.value);
        } },
        { headerName: "Stock ", field: "stock", sortable: true, editable:true },
        { headerName: "Stock critico ", field: "stock_critico", sortable: true, editable:true },
        { headerName: "Accion" , field:"stock", cellRenderer:(params) => 
        <div className="flex  h-full">
  
            <div className="flex ml-2">
            <Button className="flex items-end justify-center  h-full " onClick={() => eliminar(params.data.id)} color="red">
            <XMarkIcon strokeWidth={2} className="h-4 w-5 pr-2"  /> Eliminar</Button>
            </div>
            </div> , width: 300,  },
       
    ]);

    
    const resetForm = () => {
        setNombre(''),
        setPrecio(''),
        setStock('')
        setStock_Critico('')
    }

    

    const handleSubmitProd = async (e) => {
        e.preventDefault()
            
            try{
                
                const url = '/postProductos'
                const {data} = await clienteAxios.post(url, {nombre:nombre,precio:precio,stock:stock,idusuario:idusuario,stock_critico:stock_critico || null })
                obtenerDatos()
                resetForm()
                toast.success('Producto agregado exitosamente');
              }catch(error){
               
                toast.error(`${error.response.data.msg}`);
             
              }
    
        
      };

      async function  eliminar(id) { 
        
        const res = await clienteAxios.delete(`/delProductos/${id}`).then((res) =>{
          setOpen(true)
          setAlerta({
            msg:"Producto eliminado exitosamente"
           })
           toast.success('Producto eliminado exitosamente');
          obtenerDatos()
        
        }).catch((err)=>{
          
        })
        
      }

      const onSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
      };
      
      const filteredRowData = rowData.filter(
        (row) =>
          row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
          
      );

    

        
    return (
        <>
      
        <Toaster position="top-center" />
        <div className="lg:w-[62rem] h-full">
    <Datagrid  onSearchTermChange={onSearchTermChange} 
    filteredRowData={filteredRowData}
     columnDefs={colDefs} 
     nombre={"Productos"} 
     nomButton={"Agregar Producto"} 
     desplegableAgregarAbierto={toggleDesplegable}
     handleCellEditingStopped={handleCellEditingStopped}
      />
 </div>
    {desplegableAgregarAbierto && 
    (
        
        <form className="" onSubmit={handleSubmitProd}>
             
        <div className="fixed top-0 right-0 h-full w-[20rem] bg-white p-4 shadow">
              <Typography variant="h3"> Agregar Productos </Typography>
           

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
        
        <Input type="number" variant="outlined" label="Stock" placeholder="12345" value={stock} onChange={e => setStock(e.target.value)} />
          </div>
          <Typography variant="h5" className='pt-5 '> Stock notificacion (opcional) </Typography>
          <div className="relative inline-block text-left pt-3 w-full">
        
        <Input type="number" variant="outlined" label="Stock critico" placeholder="12345" value={stock_critico} onChange={e => setStock_Critico(e.target.value)} />
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