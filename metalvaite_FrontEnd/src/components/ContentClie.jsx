import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Datagrid from "./Datagrid";
import toast, { Toaster } from 'react-hot-toast';
import {
    Typography,
    Button,
    Input,
    Textarea 
  } from "@material-tailwind/react";
  import { CheckIcon,XMarkIcon,PencilIcon} from "@heroicons/react/24/solid";
  import useAuth from "../hooks/useAuth";
 

export function ContentClie(props) {
    const {auth} = useAuth();
    const [nombre, setNombre] = useState('')
    const [detalle, setDetalle] = useState('')
    const [idusuario, setIdusuario] = useState(auth.id)
    const [rowData, setRowData] = useState([])
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
    const id = idusuario
    const url = `/getClientes/${id}`
    const res = await clienteAxios.get(url)
    setRowData(res.data.rows)
}


const handleCellEditingStopped =  async (event) => {
  
   try{
    const { id, nombre, detalle,idusuario} = event.data;
      
                const url = `/uptClientes/${id}`

                const {data} = await clienteAxios.patch(url, {nombre,detalle,idusuario })
               
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
        { headerName: "Detalles ", field: "detalle", sortable: true, editable:true},
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
        setDetalle('')

    }

    

    const handleSubmitProd = async (e) => {
        e.preventDefault()
            
            try{
                
                const url = '/postClientes'
                const {data} = await clienteAxios.post(url, {nombre:nombre,detalle:detalle,idusuario:idusuario })
                obtenerDatos()
                resetForm()
                toast.success('Producto agregado exitosamente');
              }catch(error){
               
                toast.error(`${error.response.data.msg}`);
             
              }
    
        
      };

      async function  eliminar(id) { 
        
        const res = await clienteAxios.delete(`/delClientes/${id}`).then((res) =>{
          setOpen(true)
         
           toast.success('Cliente eliminado exitosamente');
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
     nombre={"Cliente"} 
     nomButton={"Agregar Cliente"} 
     desplegableAgregarAbierto={toggleDesplegable}
     handleCellEditingStopped={handleCellEditingStopped}
      />
 </div>
    {desplegableAgregarAbierto && 
    (
        
        <form className="" onSubmit={handleSubmitProd}>
             
        <div className="fixed top-0 right-0 h-full w-[20rem] bg-white p-4 shadow">
              <Typography variant="h3"> Agregar Cliente </Typography>
           

              <Typography variant="h5" className='pt-5'> Nombre del Cliente </Typography>

          <div className="relative inline-block text-left pt-3 w-full">
        
          <Input  variant="outlined" label="Cliente" placeholder="Cliente" value={nombre} onChange={e => setNombre(e.target.value)}/>
          </div>
          <Typography variant="h5" className='pt-5'> Detalle </Typography>
        <div className="relative inline-block text-left pt-3 w-full">
        
        <Textarea  variant="outlined"  placeholder="Descripcion del cliente" value={detalle} onChange={e => setDetalle(e.target.value)}/>
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