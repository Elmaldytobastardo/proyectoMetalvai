import {pool} from '../db.js'

export const getProducto = async (req,res) => {
    const {nombre, precio, stock,idusuario } = req.body
   const [rows] = await pool.query('SELECT * FROM producto') 
    console.log(req.body)
res.send({rows})
}

export const createProducto = async (req,res) => {
    const {nombre, precio, stock,idusuario } = req.body
   const [rows] = await pool.query('INSERT INTO producto (nombre,precio, stock,idusuario) VALUES(?,?,?,?)',[nombre,precio,stock,idusuario]) 
    console.log(req.body)
res.send({
    id: rows.insertId,
    nombre,
    precio,
    stock,
    idusuario
})
}
export const updateProducto = (req,res) => res.send('creando productos')
export const deleteProducto = (req,res) => res.send('creando productos')