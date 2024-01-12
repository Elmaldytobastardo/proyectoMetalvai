import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useEffect, useState, Fragment } from "react";
  import clienteAxios from "../config/axios";
  import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
  import { CheckIcon, UserPlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
  import { ChevronDownIcon } from '@heroicons/react/20/solid'
  import Datagrid from "./Datagrid";
  import { Spinner } from "@material-tailwind/react";
  
  export function ContentVentas() {
    const [datos, setDatos] = useState([])
    const [desplegableAgregarAbierto, setDesplegableAbierto] = useState(false);
    const [desplegarOpcionesA, setDesplegarOpcionesA] = useState(false);
    const [desplegarOpcionesB, setDesplegarOpcionesB] = useState(false);
    const [clientes, setClientes] = useState([])
    const [productos, setProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState('')
    const [clienteSeleccionado, setClienteSeleccionado] = useState('')
    const [listaProductos, agregarProducto] = useState([])
    const [valorTotal, setValorTotal] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDesplegable = () => {
      setDesplegableAbierto(!desplegableAgregarAbierto);
    };
  
    const seleccionarProducto = (producto) => {
      producto.resultado = producto.precio
      console.log(producto)
      setProductoSeleccionado(producto)
      agregarProducto((prevProductos) => [...prevProductos, producto])
  
      setDesplegarOpcionesB(!desplegarOpcionesB);
    };
    const seleccionarCliente = async (cliente) => {
      setClienteSeleccionado(cliente)
      setDesplegarOpcionesA(!desplegarOpcionesA)
    }
  
    const verOpcionesA = async () => {
      const url = '/getClientes'
      const res = await clienteAxios.get(url)
      setClientes(res.data.rows)
      setDesplegarOpcionesA(!desplegarOpcionesA);
    };
  
    const verOpcionesB = async () => {
      const url = '/getProductos'
      const res = await clienteAxios.get(url)
      setProductos(res.data.rows)
      setDesplegarOpcionesB(!desplegarOpcionesB);
    };
    const resetForm = () => {
      setNombre(''),
        setPrecio(''),
        setStock('')
    }
    const guardar = async () => {
      const url = '/postVentas'
      const res = await clienteAxios.get(url)
      setClientes(res.data.rows)
      setDesplegarOpcionesA(!desplegarOpcionesA);
    }
  
    const calcular = (cantidad, producto) => {
      producto.resultado = cantidad * producto.precio
      calcularTotal()
    }
  
    const eliminarProducto = async (producto) => {
      console.log("olaaa")
      const indiceAEliminar = listaProductos.indexOf(producto);
      if (indiceAEliminar !== -1) {
        listaProductos.splice(indiceAEliminar, 1);
      }
      console.log("chaooo", producto.id)
      calcularTotal()
    }
  
    const calcularTotal = async () => {
      
      console.log("jeje god", listaProductos)
      let valorTotalSuma = 0
      for (let i = 0; i < listaProductos.length; i++) {
        console.log(listaProductos[i])
        valorTotalSuma += listaProductos[i].resultado
      }
      setValorTotal(valorTotalSuma)
      const url = '/getClientes'
      const res = await clienteAxios.get(url)
      setClientes(res.data.rows)
  
    }
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      try {
  
        const url = '/getClientes'
        const { data } = await clienteAxios.post(url)
        console.log(data)
        resetForm()
  
      } catch (error) {
        console.log(error)
  
      }
  
  
    };
  
    const obtenerDatos = async (e) => {
      const url = '/getVentas'
      const res = await clienteAxios.get(url)
  
      setDatos(res.data.rows)
      console.log(datos)
    };
  
    useEffect(() => {
      obtenerDatos();
      calcularTotal();
    }, [listaProductos]);
  
    const onSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
      };
      
      const filteredRowData = datos.filter(
        (row) =>
          row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
          
      );

      const [colDefs, setColDefs] = useState([
        { headerName: "Nombre ", field: "nombre", sortable: true },
        { headerName: "Precio ", field: "precio", sortable: true },
        { headerName: "Stock ", field: "stock", sortable: true },
       
    ]);

    return (
      <>
  
  
  <Datagrid  onSearchTermChange={onSearchTermChange} filteredRowData={filteredRowData} columnDefs={colDefs} nombre={"Ventas"} nomButton={"Agregar Venta"} desplegableAgregarAbierto={toggleDesplegable} />
       
        {desplegableAgregarAbierto && (
          <div className="fixed top-0 right-0 h-screen w-[20rem] bg-white p-4 shadow">
            <p className="text-2xl">Agregar venta</p>
  
  
            <p className="mt-20">Seleccionar Cliente</p>
  
            <div className="relative inline-block text-left">
              <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={verOpcionesA}>
                  {clienteSeleccionado ? clienteSeleccionado.nombre : "Lista de Clientes"}
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
              </div>
              {desplegarOpcionesA && (
                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">
                    {clientes.map((cliente) => (<a key={cliente.id} href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${cliente.id}`} onClick={() => seleccionarCliente(cliente)}>{cliente.nombre}</a>))}
                  </div>
                </div>)}
            </div>
  
            <p className="mt-20">Seleccionar Fecha de Venta</p>
            <input className="border border-black w-40" type="date"></input>
  
            <p className="mt-20">Seleccionar Productos</p>
            <table className="w-1 table-auto text-left">
              <thead>
                <tr>
                  <th className="py-1 px-1 border-b text-sm">Nombre</th>
                  <th className="py-1 px-1 border-b text-sm">Cantidad</th>
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
                      <input className="w-10 border-2 border-rose-500" type="number" defaultValue={1} onChange={(e) => calcular(e.target.value, producto)} />
                    </td>
                    <td className="p-1">
                      <div>
                        <Typography as="a" href="#">
                          {producto.resultado}
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
            <div className="relative inline-block text-left">
              <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={verOpcionesB}>
                  {productoSeleccionado ? productoSeleccionado.nombre : "Lista de Productos"}
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
              </div>
              {desplegarOpcionesB && (
                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  <div className="py-1" role="none">
                    {productos.map((producto) => (<a key={producto.id} href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id={`menu-item-${producto.id}`} onClick={() => seleccionarProducto(producto)}>{producto.nombre}</a>))}
  
                  </div>
                </div>)}
            </div>
  
            <p className="mt-20">Valor Total de la Venta</p>
            <Typography as="a" href="#">
              ${valorTotal}
            </Typography>
  
            <Button className="flex items-end justify-end mt-20" size="sm" color="green" onClick={guardar}>
              <CheckIcon strokeWidth={2} className="h-4 w-4" /> Guardar
            </Button>
            <Button className="flex items-end justify-end mt-10" size="sm" color="gray" onClick={toggleDesplegable}>
              <XMarkIcon strokeWidth={2} className="h-4 w-4" /> Cancelar
            </Button>
          </div>)}
      </>
    );
  }