import { Router } from "express";
import {getVentas, postVentas} from '../controllers/ventas.controllers.js'

const router = Router()

router.get('/getVentas',getVentas)

router.post('/postVentas',postVentas)

export default router