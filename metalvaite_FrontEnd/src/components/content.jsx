
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import moment from "moment";
import 'moment/locale/es';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import useAuth from "../hooks/useAuth"
import { useMemo } from "react";


export function Content() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const { auth } = useAuth()
  const [idusuario] = useState(auth.id)

  const [productoFiltrado, setProductoFiltrado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('01');
  const [anoSeleccionado, setAnoSeleccionado] = useState('2024');
  const [productosCalculados, setProductosCalculados] = useState([])
  //const [productosOrdenados, setProductosOrdenados] = useState([])
  useEffect(() => {
    obtenerdatos()


  },[]);
  
  const productosOrdenados = useMemo(() => {
    return productosCalculados.sort((a, b) => b.porcentaje - a.porcentaje);
  }, [productosCalculados]);

  async function obtenerdatos() {
    clienteAxios.get(`/getVentasByUser/${idusuario}`).then(response => {
      setData(response.data.rows);
    }).catch(error => { console.error('Error al obtener datos:', error); });

    clienteAxios.get(`/getProductos/${idusuario}`).then(response => {
      setData2(response.data.rows);
      if (response.data.rows.length > 0) {
        calcularStockCritico(response.data.rows);
      }
    }).catch(error => { console.error('Error al obtener datos:', error); });
    
  }
  
  const calcularTotal = () => {
    console.log("AHORA SÍ")
    if (data2.length == 0) {
      setData2(data)
      return
    }
    console.log("olaaa", data2)
    for (let i = 0; i < data.length; i++) {
      const productos = JSON.parse(data[i].productos)
      setProductoFiltrado(data.fecha_venta, productos)

    }
    console.log(productoFiltrado)

  }
  const calcularStockCritico = (datos) => {
    const nuevosProductosCalculados = [];

    for (let i = 0; i < datos.length; i++) {
      const producto = datos[i];
      if (producto.stock_critico != null) {
        producto.porcentaje = (producto.stock_critico * 100) / producto.stock;

        if (producto.porcentaje >= 50) {
          nuevosProductosCalculados.push(producto);
        }
      }
    }

    setProductosCalculados(nuevosProductosCalculados);
  };
  const handleCambioMes = (event) => {
    setMesSeleccionado(event.target.value);
  };

  const handleCambioAno = (event) => {
    setAnoSeleccionado(event.target.value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const tooltipStyle = {
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      };
      const defaultTooltip = payload.map((entry) => {
        const color = entry.dataKey === 'stock' ? 'green' : '#D71818';
        return (
          <p key={entry.name} className="label" style={{ color }}>
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


          <ResponsiveContainer maxwidth="100%" width="100%" aspect={1.5}>
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
              <YAxis dataKey="precio" />
              <Tooltip />
              <Legend />
              <Bar dataKey="precio" fill="#D71818" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>


        </Card>



        <Card className="flex justify-center items-center lg:ml-10 mt-6 w-full lg:w-[40rem]">

          <Typography className=" text-black" variant="h4">
            Productos más cercanos a su Stock Crítico
          </Typography>

          {(

            <ResponsiveContainer maxwidth="100%" width="100%" aspect={1.5}>
              <BarChart
                width={1000}
                height={500}
                data={productosOrdenados}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="nombre" />
                <YAxis dataKey="stock" />
                <YAxis dataKey="stock_critico" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar name="Stock Actual" dataKey="stock" fill="green" />
                <Bar name="Stock Crítico" dataKey="stock_critico" fill="#D71818" />
              </BarChart>
            </ResponsiveContainer>

          )


          }
        </Card>
      </div>
    </>
  );
}