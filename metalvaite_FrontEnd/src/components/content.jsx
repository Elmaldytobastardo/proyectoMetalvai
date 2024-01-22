
  import { useEffect, useState, useMemo } from "react";
import clienteAxios from "../config/axios";

import {BarChart, Bar, Rectangle,
   XAxis, YAxis, CartesianGrid, 
   Tooltip, Legend, 
   ResponsiveContainer } from 'recharts';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

export function Content() {
  const [data, setData] = useState([]);
  const [datosAgrupadosPorMes, setDatosAgrupadosPorMes] = useState([]);
  const { auth } = useAuth()
 
  const [mesSeleccionado, setMesSeleccionado] = useState('01');
  const [mesSeleccionadoProd, setMesSeleccionadoProd] = useState(''); 
  const [anoSeleccionado, setAnoSeleccionado] = useState('2024');
  const [anoSeleccionadoProd, setAnoSeleccionadoProd] = useState('');
  const [idusuario] = useState(auth.id)



  useEffect(() => {

    obtenerDatos()
    agruparDatos() 
    
  } 
, [ mesSeleccionadoProd,anoSeleccionadoProd]);  

const agruparDatos = async () => {
     
  const datosAgrupados  = [];

  data.forEach((venta) => {
    
  const productosJson = JSON.parse(venta.productos)
  const fecha = moment(venta.fecha_venta, 'DD/MM/YYYY');
  
const mesesConvert = {
      "1":"Enero",
      "2":'Febrero',
      "3":'Marzo',
      '4':'Abril',
      '5':'Mayo',
      '6':'Junio',	
      '7':'Julio',
      '8':'Agosto',
      '9':'Septiembre',
      '10':'Octubre',
      '11':'Noviembre',
      '12':'Diciembre',
    };
  let meses = fecha.month() + 1;
  const mes = mesesConvert[meses]
  const ano = fecha.year();

  if (
    (!mesSeleccionadoProd || mes.toString() === mesSeleccionadoProd) &&
    (!anoSeleccionadoProd || ano.toString() === anoSeleccionadoProd)
  ) {
    const productos = productosJson.map((producto) => ({
      nombre: producto.nombre,
      cantidadVendida: producto.cantidad,
    }));
    
    productos.forEach((producto) => {
     
      
      const clave = `${mes}-${ano}-${producto.nombre}`;
      
      console.log(clave)
      
      if (!datosAgrupados[clave]) {
        datosAgrupados[clave] = {
          mes,
          ano,
          nombre: producto.nombre,
          cantidadVendida: 0,
        };
      }

      datosAgrupados[clave].cantidadVendida += producto.cantidadVendida;
    });
  }
});

const resultados = Object.values(datosAgrupados);

// Encontrar el producto más vendido para cada mes
const resultadosFiltrados = resultados.reduce((acc, dato) => {
  const mismoMes = acc.find((item) => item.mes === dato.mes);
  if (!mismoMes || mismoMes.cantidadVendida < dato.cantidadVendida) {
    // Reemplazar si no se encuentra o si la cantidad es mayor
    return acc.filter((item) => item.mes !== dato.mes).concat(dato);
  }
  return acc;
}, []);

setDatosAgrupadosPorMes(resultadosFiltrados);




 
};  

useMemo(() => {
  agruparDatos() 
  }, [data,mesSeleccionadoProd,anoSeleccionadoProd]);

const obtenerDatos = async () => {
  const id = idusuario 
  await clienteAxios.get(`/getVentasByUser/${id}`) 
    .then(response => {
     
      setData(response.data.rows);
     
    })
    .catch(error => {
      console.error('Error al obtener datos:', error);
    });
}
  

  
const handleChangeMesProd = (event) => {
  setMesSeleccionadoProd(event.target.value); 
};

const handleChangeAñoProd = (event) => {
  setAnoSeleccionadoProd(event.target.value);
};
 

  const handleCambioMes = (event) => {
    setMesSeleccionado(event.target.value);
  };

  const handleCambioAno = (event) => {
    setAnoSeleccionado(event.target.value);
  };

 
  const CustomTooltipProd = ({ active, payload, label }) => {
   
    if (active && payload && payload.length) {
      
    
      const tooltipStyle = {
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };
      
      const defaultTooltip = payload.map((entry) => {
        return (
          <p key={entry.name} className="label" style={{   }}>
            
            {`${entry.payload.mes}`}
            <br />
            {`${entry.name} : ${entry.value}`}
       
            
          </p>
        );
      });

      return (
        <div className="custom-tooltip" style={tooltipStyle}>
          {defaultTooltip}
        </div>
      );
    }

    return null;
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
         Ventas mensuales de {auth.nombre}
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
      <select  value={anoSeleccionado} onChange={handleCambioAno}>
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
      <select className="ml-2"  value={mesSeleccionadoProd} onChange={handleChangeMesProd}>
      <option value="">Todos </option>
      <option value="Enero">Enero </option>
        <option value="Febrero">Febrero </option>
        <option value="Marzo">Marzo </option>
        <option value="Abril">Abril </option>
        <option value="Mayo">Mayo </option>
        <option value="Junio">Junio </option>
        <option value="Julio">Julio </option>
        <option value="Agosto">Agosto </option> 
        <option value="Septiembre">Septiembre </option>
        <option value="Octubre">Octubre </option>
        <option value="Noviembre">Noviembre </option>
        <option value="Diciembre">Diciembre </option>
       
      </select>
  


<label >Selecciona un año:</label>
      <select  value={anoSeleccionadoProd} onChange={handleChangeAñoProd}>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      
      </select>
</div>
      
     {datosAgrupadosPorMes.length > 0 ? (
  
        <ResponsiveContainer maxwidth="100%" width="100%"  aspect={1.5}>
          
          <BarChart data={datosAgrupadosPorMes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip content={<CustomTooltipProd />} />
          <Legend />

          <Bar
            dataKey="cantidadVendida"
            fill="#8884d8"
            name="Cantidad Vendida"
          />
        </BarChart>
   

        </ResponsiveContainer>

) : (
  
  <p>Cargando Los datos o Aun no hay productos por mostrar...</p>
)
    
       
}
         </Card>
         </div>
    </>
  );
}