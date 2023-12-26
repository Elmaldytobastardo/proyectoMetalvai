import { Router } from "express";
import {getProducto, createProducto, updateProducto, deleteProducto, getProductoById} from '../controllers/productos.controllers.js'

const router = Router()

router.get('/getProductos',getProducto)

router.get('/getProductos/:id',getProductoById)

router.post('/postProductos',createProducto)

router.patch('/uptProductos/:id',updateProducto)

router.delete('/delProductos/:id',deleteProducto)


export default router