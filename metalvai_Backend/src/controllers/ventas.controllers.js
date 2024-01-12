import {pool} from '../db.js'

export const getVentas = async (req,res) => {

try {
   
    const [rows] = await pool.query('SELECT * FROM venta') 
     
 res.send({rows})
} catch (error) {
    return res.status(500).json({
        message: 'Quedó la pala'
    })
}
 
}

export const postVentas = async (req,res) => {
    const {nombre,fecha_venta,precio, idusuario, idcliente } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO venta (nombre,fecha_venta,precio, idusuario, idcliente) VALUES(?,?,?,?,?)',[nombre,fecha_venta,precio, idusuario, idcliente]) 
         
     res.send({
         id: rows.insertId,
         nombre,
         fecha_venta,
         precio,
         idusuario,
         idcliente
     })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }


}


export const updateProducto = async (req,res) => {
    const {id} = req.params
    const {nombre, precio, stock,idusuario } = req.body
    try {
  
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
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
   }
   
  
}



export const deleteProducto =  async (req,res) => {
    try {
        const [result] = await pool.query('DELETE FROM producto WHERE id=? ', [req.params.id]) 

        if (result.affectedRows <= 0  ){ 
         return res.status(404).json({ message: 'Producto no encontrado'})
        }
         
         res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
 

}