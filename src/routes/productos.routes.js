import { Router } from "express";
import {getProducto, createProducto, updateProducto, deleteProducto} from '../controllers/productos.controllers.js'

const router = Router()

router.get('/getProductos',getProducto)

router.post('/postProductos',createProducto)

router.put('/obProductos',updateProducto)

router.delete('/obProductos',deleteProducto)


export default router