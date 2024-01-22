import { Router } from "express";
import {getVentaByIdUser, postVentas,deleteVentas,getVentaId, getVenta} from '../controllers/ventas.controllers.js'
import checkStock from "../middleware/CheckStock.js";
const router = Router()

router.get('/getVentasByUser/:id',getVentaByIdUser)

router.post('/postVentas',checkStock,postVentas)

router.get('/getVenta', getVenta)

router.delete('/deleteVentas/:id',deleteVentas) 

router.get('/getVentaId/:id',getVentaId)

export default router