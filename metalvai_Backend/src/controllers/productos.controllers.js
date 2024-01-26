import { pool } from '../db.js'


export const getProductoById = async (req, res) => {

    try {
        const rows = await pool.query('SELECT * FROM producto WHERE idusuario=$1', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.send( rows )
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const getProducto = async (req, res) => {

    try {

        const rows = await pool.query('SELECT * FROM producto')

        res.json({ rows })

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}



export const createProducto = async (req, res) => {
    const { nombre, precio, stock, idusuario, stock_critico } = req.body
    const existe = await pool.query('SELECT * FROM producto WHERE nombre =$1', [nombre])
    
    if (existe.rows.length > 0) {
        const error = new Error('Producto ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {   

        const query = ('INSERT INTO producto (nombre,precio, stock,idusuario,stock_critico) VALUES($1,$2,$3,$4,$5) RETURNING *')
        const {rows} = await pool.query(query,[nombre,precio,stock,idusuario,stock_critico]) 
        return res.status(200).json({
            msg: 'Producto agregado'
        })
     

    } catch (error) {
        
        
        return res.status(500).json({
            msg: 'Complete todos los campos'
        })
    }


}


export const updateProducto = async (req, res) => {
    const { id } = req.params
    const { nombre, precio, stock, idusuario, stock_critico } = req.body

  
    try {

        const result = await pool.query('UPDATE producto SET nombre = ($1), precio = ($2), stock = ($3) , idusuario = ($4), stock_critico = ($5) WHERE id = $6  RETURNING *',
            [nombre, precio, stock, idusuario, stock_critico, id])
           
       

        const rows = await pool.query('SELECT * FROM producto WHERE id = $1', [id])
        res.json(rows)



    } catch (error) {
        
        return res.status(500).json({
            msg: 'Something goes wrong'
        })
    }


}



export const deleteProducto = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM producto WHERE id=$1 ', [req.params.id])
     
        
        res.sendStatus(204)
    } catch (error) {
        
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }


}
