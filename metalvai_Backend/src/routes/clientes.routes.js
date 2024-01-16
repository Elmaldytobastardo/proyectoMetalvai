import { Router } from "express";
import {getClientes, getClienteById, createCliente, updateCliente, deleteCliente,} from '../controllers/clientes.controllers.js'

const router = Router()

router.get('/getClientes',getClientes)

router.get('/getClientes/:id',getClienteById)

router.post('/postClientes',createCliente)

router.patch('/uptClientes/:id',updateCliente)

router.delete('/delClientes/:id',deleteCliente)

export default router