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
export const updateProducto = async (req,res) => {
    const {id} = req.params
    const {nombre, precio, stock,idusuario } = req.body
    const [result] = await pool.query('UPDATE producto SET nombre = IFNULL(?,nombre), precio = IFNULL(?,precio), stock = IFNULL(?,stock) , idusuario = IFNULL(?,idusuario) WHERE id = ?', 
    [nombre,precio,stock,idusuario, id])
    console.log(result)
    if (result.affectedRows == 0){
        return res.status(404).json({
            message: 'Producto no existe'
        })
    }
   

    const [rows] = await pool.query('SELECT * FROM producto WHERE id = ?', [id])
    res.json(rows[0])
}

export const deleteProducto =  async (req,res) => {
    
   const [result] = await pool.query('DELETE FROM producto WHERE id=? ', [req.params.id]) 

   if (result.affectedRows <= 0  ){ 
    return res.status(404).json({ message: 'Producto no encontrado'})
   }
    
    res.sendStatus(204)

}