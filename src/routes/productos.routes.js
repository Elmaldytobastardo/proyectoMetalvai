import { Router } from "express";
import {getProducto, createProducto, updateProducto, deleteProducto} from '../controllers/productos.controllers.js'

const router = Router()

router.get('/getProductos',getProducto)

router.post('/postProductos',createProducto)

router.patch('/uptProductos/:id',updateProducto)

router.delete('/delProductos/:id',deleteProducto)


export default router