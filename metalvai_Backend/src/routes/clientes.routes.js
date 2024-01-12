import { Router } from "express";
import {getClientes} from '../controllers/clientes.controllers.js'

const router = Router()

router.get('/getClientes',getClientes)


export default router