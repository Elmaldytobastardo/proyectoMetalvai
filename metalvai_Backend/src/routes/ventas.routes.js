import { Router } from "express";
import {getVentas, postVentas,deleteVentas,getVentaId} from '../controllers/ventas.controllers.js'

const router = Router()

router.get('/getVentas',getVentas)

router.post('/postVentas',postVentas)


router.delete('/deleteVentas/:id',deleteVentas) 

router.get('/getVentaId/:id',getVentaId)

export default router