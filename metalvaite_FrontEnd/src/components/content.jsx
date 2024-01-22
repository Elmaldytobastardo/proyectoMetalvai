
  import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import moment from "moment";
import 'moment/locale/es';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  Typography,
} from "@material-tailwind/react";


export function Content() {
  const [data, setData] = useState([]);
  
  const [productoFiltrado, setProductoFiltrado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('01');
  const [anoSeleccionado, setAnoSeleccionado] = useState('2024');
  useEffect(() => {
 
    clienteAxios.get('/getVenta')
      .then(response => {
       
        setData(response.data.rows);
       
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
    
      calcularTotal()
  }, [productoFiltrado]); 

  const calcularTotal = () => {
    
    for (let i = 0; i < data.length; i++) {
      const productos = JSON.parse(data[i].productos)
      setProductoFiltrado(data.fecha_venta ,productos)   
      
    }
   console.log(productoFiltrado)
   
  }

  const handleCambioMes = (event) => {
    setMesSeleccionado(event.target.value);
  };

  const handleCambioAno = (event) => {
    setAnoSeleccionado(event.target.value);
  };



  const datosFiltrados = data
  .filter((item) => {
    const fechaActual = moment(item.fecha_venta, 'DD/MM/YYYY');
    const mesActual = fechaActual.format('MM');
    const anoActual = fechaActual.format('YYYY');
    return mesActual === mesSeleccionado && anoActual === anoSeleccionado;
  })
  .sort((a, b) => moment(a.fecha_venta, 'DD/MM/YYYY') - moment(b.fecha_venta, 'DD/MM/YYYY'));



  return (
    <>
    
    <div className="lg:flex ">

 <Card className="flex justify-center items-center mt-6 w-full lg:w-[40rem]">
 
 <Typography className=" text-black" variant="h4">
          Ventas mensuales
        </Typography>
      
  <div>
  <label >Selecciona un mes:</label>
      <select className="ml-2" id="selectMes" value={mesSeleccionado} onChange={handleCambioMes}>
      <option value="01">Enero </option>
        <option value="02">Febrero </option>
        <option value="04">Marzo </option>
        <option value="05">Abril </option>
        <option value="06">Junio </option>
        <option value="07">Julio </option>
        <option value="08">Agosto </option>
        <option value="09">Septiembre </option>
        <option value="10">Octubre </option>
        <option value="11">Noviembre </option>
        <option value="12">Diciembre </option>
       
      </select>
  


<label htmlFor="selectAno">Selecciona un año:</label>
      <select id="selectAno" value={anoSeleccionado} onChange={handleCambioAno}>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      
      </select>
</div>
      

         <ResponsiveContainer maxwidth="100%" width="100%"  aspect={1.5}>
         <BarChart
          width={1000}
          height={500}
          data={datosFiltrados}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="fecha_venta" />
          <YAxis dataKey="precio"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="precio" fill="#D71818" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
        </ResponsiveContainer>
    
       
         </Card>
  
         <Card className="flex justify-center items-center lg:ml-10 mt-6 w-full lg:w-[40rem]">
 
 <Typography className=" text-black" variant="h4">
          Productos más vendidos
        </Typography>
      
  <div>
  <label >Selecciona un mes:</label>
      <select className="ml-2" id="selectMes" value={mesSeleccionado} onChange={handleCambioMes}>
      <option value="01">Enero </option>
        <option value="02">Febrero </option>
        <option value="04">Marzo </option>
        <option value="05">Abril </option>
        <option value="06">Junio </option>
        <option value="07">Julio </option>
        <option value="08">Agosto </option>
        <option value="09">Septiembre </option>
        <option value="10">Octubre </option>
        <option value="11">Noviembre </option>
        <option value="12">Diciembre </option>
       
      </select>
  


<label htmlFor="selectAno">Selecciona un año:</label>
      <select id="selectAno" value={anoSeleccionado} onChange={handleCambioAno}>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      
      </select>
</div>
      
     {productoFiltrado.length > 0 ? (
  
        <ResponsiveContainer maxwidth="100%" width="100%"  aspect={1.5}>
         <BarChart
          width={1000}
          height={500}
          data={productoFiltrado}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5, 
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="fecha_venta " /> 
          <YAxis dataKey="cantidad"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" fill="#D71818" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
        </ResponsiveContainer>

) : (
  
  <p>Cargando...</p>
)
    
       
}
         </Card>
         </div>
    </>
  );
}