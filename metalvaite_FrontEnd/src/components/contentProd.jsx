import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Datagrid from "./Datagrid";

export function ContentProd({ total, current, onChange }) {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [stock, setStock] = useState('')
    const [idusuario, setIdusuario] = useState('123')
    const [rowData, setRowData] = useState([])


    useEffect(() => {
        const obtenerDatos = async (e) => {
            const url = '/getProductos'
            const res = await clienteAxios.get(url)
            setRowData(res.data)


        }

        obtenerDatos();

    }, []);
    console.log(rowData)
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { headerName: "Nombre ", field: "nombre", sortable: true },
        { headerName: "Precio ", field: "precio", sortable: true },
        { headerName: "Stock ", field: "stock", sortable: true },
        { headerName: "Idusuario ", field: "idusuario", sortable: true }
    ]);




    const resetForm = () => {
        setNombre(''),
            setPrecio(''),
            setStock('')
    }






    return (
        <>

    <Datagrid rowData={rowData} columnDefs={colDefs}/>

        </>
    );
}