import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `http://localhost:1234`
})

export default clienteAxios;