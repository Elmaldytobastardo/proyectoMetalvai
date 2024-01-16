import { pool } from '../db.js'


export const getProductoById = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM producto WHERE id=?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.send({ rows })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const getProducto = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM producto')

        res.json({ rows })

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}



export const createProducto = async (req, res) => {
    const { nombre, precio, stock, idusuario, stock_critico } = req.body
    const [existe] = await pool.query('SELECT * FROM producto WHERE nombre =?', [nombre])
    if (existe.length > 0) {
        const error = new Error('Producto ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        
        const [rows] = await pool.query('INSERT INTO producto (nombre,precio, stock,idusuario,stock_critico) VALUES(?,?,?,?,?)', [nombre, precio, stock, idusuario, stock_critico])
        
        res.json({
            id: rows.insertId,
            nombre,
            precio,
            stock,
            idusuario,
            stock_critico
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
    
    const [existe] = await pool.query('SELECT nombre FROM producto WHERE nombre =?', [nombre])
    if (existe.length > 1) {
       
        const error = new Error('Producto ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {

        const [result] = await pool.query('UPDATE producto SET nombre = IFNULL(?,nombre), precio = IFNULL(?,precio), stock = IFNULL(?,stock) , idusuario = IFNULL(?,idusuario), stock_critico = IFNULL(?,stock_critico) WHERE id = ?',
            [nombre, precio, stock, idusuario, stock_critico, id])

        if (result.affectedRows == 0) {
            return res.status(404).json({
                message: 'Producto no existe'
            })

        }


        const [rows] = await pool.query('SELECT * FROM producto WHERE id = ?', [id])
        res.json(rows[0])



    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong'
        })
    }


}



export const deleteProducto = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM producto WHERE id=? ', [req.params.id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }


}