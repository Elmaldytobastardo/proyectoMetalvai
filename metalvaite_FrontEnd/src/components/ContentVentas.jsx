import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import clienteAxios from "../config/axios";
import { CheckIcon,  XMarkIcon, EyeIcon } from "@heroicons/react/24/solid";
import Datagrid from "./Datagrid";
import { Select, Option } from "@material-tailwind/react";
import moment from "moment"
import 'moment/locale/es';
import useAuth from "../hooks/useAuth"
import toast, { Toaster } from 'react-hot-toast';

export function ContentVentas() {
  const [datos, setDatos] = useState([])
  const [desplegableAgregarAbierto, setDesplegableAbierto] = useState(false);
  const [desplegarOpcionesA, setDesplegarOpcionesA] = useState(false);
  const [desplegarOpcionesB, setDesplegarOpcionesB] = useState(false);
  const [clientes, setClientes] = useState([])
  const [productosBD, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState('')
  const [clienteSeleccionado, setClienteSeleccionado] = useState('')
  const [listaProductos, agregarProducto] = useState([])
  const [valorTotal, setValorTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [fecha_venta, setFechaSeleccionada] = useState('' )
  const [nombre, setNombre] = useState('')
  const { auth } = useAuth()
  const [idusuario] = useState(auth.id)
  const [idcliente, setIdcliente] = useState()
  const [productos, setProductosParse] = useState('')
  const [precio, setPrecio] = useState()
  const [open, setOpen] = useState(false);
  const [productosVenta, setProductosVenta] = useState([])
  const [verVenta, setVerVenta] = useState([])
  
  useEffect(() => {
    
    obtenerDatos();
    calcularTotal();
  }, [listaProductos]);


  async function obtenerDatos() {
    const id = idusuario
   
    const res = await clienteAxios.get(`/getVentasByUser/${id}`).then((res) => {
      console.log(res.data.rows)
      setDatos(res.data.rows)

    }).catch((err) => {
    
    })
    const res2 = await clienteAxios.get(`/getClientes/${id}`).then((res2) => {
      setClientes(res2.data.rows)

    }).catch((err) => {
    
    })
  }
  


  const toggleDesplegable = async () => {
    
   
    const id = idusuario
    const res3 = await clienteAxios.get(`/getProductos/${id}`).then((res3) => {
      setProductos(res3.data.rows)
     

    })
    setDesplegableAbierto(!desplegableAgregarAbierto);
    agregarProducto([])
    setClienteSeleccionado([])
  };
  
 
  const seleccionarProducto = async (producto) => {
   const id = idusuario
   
    producto.resultado = producto.precio
    producto.cantidad = 1
    
    setProductoSeleccionado(producto)
    agregarProducto((prevProductos) => [...prevProductos, producto])
 
    
    const indiceAEliminar = productosBD.indexOf(producto);
    if (indiceAEliminar !== -1) {
      productosBD.splice(indiceAEliminar, 1);
      
    }
  
    setDesplegarOpcionesB(!desplegarOpcionesB);
  };


  const seleccionarCliente = (cliente) => {
    
    setClienteSeleccionado(cliente)
    setNombre(cliente.nombre)
    setIdcliente(cliente.id)
    setDesplegarOpcionesA(!desplegarOpcionesA)
  }

  const verOpcionesA = async () => {
   
    setDesplegarOpcionesA(!desplegarOpcionesA);
  };

  const verOpcionesB = async () => {
    setDesplegarOpcionesB(!desplegarOpcionesB);
  };
  
  const guardar = async () => { 
  

    if(nombre === '' ){
      toast.error(`Seleccione un Cliente`);
      return
    }
    if(listaProductos.length == 0 ){
      toast.error(`Seleccione un producto`);
      return
    }

    try {
    
      const url = `/postVentas`
      const res = await clienteAxios.post(url, { nombre, fecha_venta, precio, idusuario, idcliente, productos })
      toast.success('Venta agregada exitosamente');
      listaProductos.map((producto) => (producto.stock = producto.stock - producto.cantidad))
   
  
      obtenerDatos();
      
      
    } catch (error) {
    
      toast.error(`${error.response.data.msg}`);
    }
   

  }
 

  const actualizar = (valorTotalSuma) => {
    if (clienteSeleccionado && listaProductos) {
        if(fecha_venta === ''){
      setFechaSeleccionada(moment(Date.now()).format('DD/MM/YYYY')) 
    }
      setNombre(clienteSeleccionado.nombre)
      setPrecio(valorTotalSuma)
      
      setIdcliente(clienteSeleccionado.id)
      setProductosParse(JSON.stringify(listaProductos))
    }
  }
  const calcular = (cantidad, producto) => {
    const nuevoValor = cantidad;
    producto.cantidad = parseInt(cantidad)
    
    producto.resultado = cantidad * producto.precio
    
    
    calcularTotal()
  }
  
 

  const eliminarProducto = async (producto) => {
    const indiceAEliminar = listaProductos.indexOf(producto);
    if (indiceAEliminar !== -1) {
      listaProductos.splice(indiceAEliminar, 1);
    }
    setProductos((prevProductos) => [...prevProductos, producto])

    calcularTotal()
  }

  const calcularTotal = () => {
    let valorTotalSuma = 0
    for (let i = 0; i < listaProductos.length; i++) {
      valorTotalSuma += listaProductos[i].resultado
    }
    
    setValorTotal(valorTotalSuma)


    actualizar(valorTotalSuma);

  }



  const fijarFecha = (fecha) => {
    fecha = moment(fecha).format("DD/MM/YYYY")
    setFechaSeleccionada(fecha)
  };

  async function eliminarVenta(id) {

    const res = await clienteAxios.delete(`/deleteVentas/${id}`).then((res) => {
      toast.success('Venta eliminada exitosamente');


      obtenerDatos()

    }).catch((err) => {

    })

  }

  const numeroFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valorTotal);


  async function verProductos(data) {
    setOpen(!open)
    const url= await clienteAxios.get(`/getVentaId/${data.id}`).then((url) => {
      
      setVerVenta(url.data.rows)
      setProductosVenta(JSON.parse(data.productos))
     
    }).catch((err) => {
    })

  }

  const Cerrar = () => {
    setOpen(!open)
    setVerVenta([])
    setProductosVenta([])
   
  }

  const [colDefs, setColDefs] = useState([
    { headerName: "Nombre", field: "nombre", sortable: true },
    { headerName: "Fecha", field: "fecha_venta", sortable: true,  },
    { headerName: "Valor", field: "precio", sortable: true, valueFormatter: (params) => {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(params.value);
    } },
    {
      headerName: "Productos", field: "precio", cellRenderer: (params) =>

        <div className="flex  h-full">

          <div className="flex ml-2">
            <Button className="flex items-end justify-center  h-full " onClick={() => verProductos(params.data)} color="green">
              <EyeIcon strokeWidth={2} className="h-4 w-5 pr-2" /> Ver</Button>
          </div>
        </div>
    },
    {
      headerName: "Eliminar Venta", field: "stock", cellRenderer: (params) =>

        <div className="flex  h-full">

          <div className="flex ml-2">
            <Button className="flex items-end justify-center  h-full " onClick={() => eliminarVenta(params.data.id)} color="red">
              <XMarkIcon strokeWidth={2} className="h-4 w-5 pr-2" /> Eliminar</Button>
          </div>
        </div>
    },

  ]);
  


  


  






  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRowData = datos.filter(
    (row) =>(row.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    row.fecha_venta.toLowerCase().includes(searchTerm.toLowerCase()))
      
      

  );


  return (
    <>
  <Toaster position="top-center" />
      <div className="w-full h-full lg:w-[62rem]">
        <Datagrid onSearchTermChange={onSearchTermChange} filteredRowData={filteredRowData} columnDefs={colDefs} nombre={"Ventas"} nomButton={"Agregar Venta"} desplegableAgregarAbierto={toggleDesplegable} /></div>

      {desplegableAgregarAbierto && (
        <div className="fixed top-0 right-0 h-full lg:w-[25rem] bg-white p-4 shadow">
          <p className="text-2xl">Agregar venta</p>


          <p className="mt-5">Seleccionar Cliente</p>

          <div className="w-72 mt-2">
            <Select label="Lista de Clientes" onClick={verOpcionesA}>
              {clientes.map((cliente) => (<Option key={cliente.id} href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${cliente.id}`} onClick={() => seleccionarCliente(cliente)}>{cliente.nombre}</Option>))}
            </Select>
          </div>

          <p className="mt-5">Seleccionar Fecha de Venta</p>
          <div className="">
          <input className=" mt-1 p-2 border-solid block w-full lg:w-[18rem] border rounded-xl focus:outline-none focus:border-blue-500" type="date" defaultValue={fecha_venta} onChange={(e) => fijarFecha(e.target.value)}></input>
          </div>
          

          <p className="mt-5">Seleccionar Productos</p>
          <table className="w-1 table-auto text-left">
            <thead>
              <tr>
                <th className="py-1 px-1 border-b text-sm">Nombre</th>
                <th className="py-1 px-1 border-b text-sm">Cantidad</th>
                <th className="py-1 px-1 border-b text-sm">Stock</th>
                <th className="py-1 px-1 border-b text-sm">Total</th>
                <th className="py-1 px-1 border-b text-sm">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaProductos.map((producto) => (
                <tr key={producto.id} className="even:bg-blue-gray-50/50">
                  <td className="p-1">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {producto.nombre}
                    </Typography>
                  </td>
                  <td className="p-1 w-1">
                    <input className="w-10 border-2 " min="1" pattern="^[0-9]+" type="number" defaultValue={1} 

                    onChange={(e) => calcular(e.target.value, producto)} />
                  </td>
                  <td className="p-1">
                    <div>
                      <Typography as="a" href="#">
                        {producto.stock}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-1">
                    <div>
                      <Typography as="a" href="#">
                      {new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(producto.resultado)}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-1 w-1">
                    <div>
                      <Typography as="a" href="#">
                        <Button id="eliminar" className="flex items-end justify-end" size="sm" color="red" onClick={(e) => eliminarProducto(producto)}>
                          <XMarkIcon strokeWidth={2} className="h-4 w-4" />
                        </Button>
                      </Typography>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-72 mt-2">
            <Select className="appearance-none border border-gray-300 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 max-h-[200px] overflow-y-auto" 
            label="Lista de Productos" 
            onClick={verOpcionesB}>
              {productosBD.map((producto) => (
              <Option key={producto.id} href="#"
               className="text-gray-700 block px-4 py-2 text-sm" 
               role="menuitem" tabIndex="-1"
                id={`menu-item-${producto.id}`} 
                onClick={() => seleccionarProducto(producto)}>{producto.nombre}</Option>))}
            </Select>
          </div>

          <p className="pt-5"> <span className="text-xl font-bold">Valor Total de la Venta:</span></p>
          <Typography className=" font-semibold" as="a" href="#">
            {numeroFormateado}
          </Typography>
                <div className="flex justify-center m-5">
                <Button className="flex   " size="sm" color="green" onClick={guardar}>
            <CheckIcon strokeWidth={2} className="h-4 w-4" /> Guardar
          </Button>
          <Button className="flex ml-5 " size="sm" color="gray" onClick={toggleDesplegable}>
            <XMarkIcon strokeWidth={2} className="h-4 w-4" /> Cancelar
          </Button>
                </div>
        
        </div>)}

      <Dialog open={open} handler={verProductos}>
        <DialogHeader>Detalles de la Venta</DialogHeader>
        <DialogBody>
          <div className="flex justify-center">
            <table className="w-full table-auto text-left">
              <thead>
                {verVenta.map((venta) => 
     
                (<div key={venta.id}>
                  <Typography>Nombre Cliente: {venta.nombre}</Typography>
                  <Typography>Fecha de Venta: {venta.fecha_venta}</Typography>
                  <Typography>Valor Total: {new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(venta.precio)} </Typography></div>))}
                <tr>
                  <th className="py-1 px-1 border-b text-sm">Producto</th>
                  <th className="py-1 px-1 border-b text-sm">Cantidad</th>
                  <th className="py-1 px-1 border-b text-sm">Precio Unitario</th>
                  <th className="py-1 px-1 border-b text-sm">Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {productosVenta.map((producto) => (
                  <tr key={producto.id} className="even:bg-blue-gray-50/50">
                    <td className="p-1">
                      <Typography as="a" href="#">
                        {producto.nombre}
                      </Typography>
                    </td>
                    <td className="p-1">
                      <Typography as="a" href="#">
                        {producto.cantidad}
                      </Typography>
                    </td>
                    <td className="p-1">
                      <div>
                        <Typography as="a" href="#">
                          {    new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(producto.precio)}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-1">
                      <Typography as="a" href="#">
                        {    new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                  }).format(producto.resultado)}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={() => Cerrar()}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}