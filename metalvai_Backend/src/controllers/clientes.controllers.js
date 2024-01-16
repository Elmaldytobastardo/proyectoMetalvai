import {pool} from '../db.js'


export const getClientes = async (req,res) => {
try {
   
    const [rows] = await pool.query('SELECT * FROM cliente') 
   
     
 res.send({rows})
} catch (error) {
    return res.status(500).json({
        message: 'No hay clientes agregados'
    })
}
 
}

export const getClienteById = async (req, res) => {

    try {
        const [rows] = await pool.query('SELECT * FROM cliente WHERE id=?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })
        res.send({ rows })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const createCliente = async (req, res) => {
    const { nombre, detalle, idusuario } = req.body
    const [existe] = await pool.query('SELECT * FROM cliente WHERE nombre =?', [nombre])
    if (existe.length > 0) {
        const error = new Error('Cliente ya registrado');
        return res.status(400).json({ msg: error.message });
    }
    try {
        
        const [rows] = await pool.query('INSERT INTO cliente (nombre,detalle,idusuario) VALUES(?,?,?)', [nombre, detalle, idusuario])
        
        res.json({
            id: rows.insertId,
            nombre,
            detalle,
            idusuario
        })

    } catch (error) {
        
        
        return res.status(500).json({
            msg: 'Complete todos los campos'
        })
    }


}


export const updateCliente = async (req, res) => {
    const { id } = req.params
    const { nombre, detalle, idusuario } = req.body
    
    const [existe] = await pool.query('SELECT nombre FROM cliente WHERE nombre =?', [nombre])
    if (existe.length > 1) {
       
        const error = new Error('Cliente ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {

        const [result] = await pool.query('UPDATE cliente SET nombre = IFNULL(?,nombre), detalle = IFNULL(?,detalle),  idusuario = IFNULL(?,idusuario) WHERE id = ?',
            [nombre, detalle, idusuario, id])

        if (result.affectedRows == 0) {
            return res.status(404).json({
                msg: 'Cliente no existe'
            })

        }


        const [rows] = await pool.query('SELECT * FROM cliente WHERE id = ?', [id])
        res.json(rows[0])



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something goes wrong'
        })
    }


}

export const deleteCliente = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM cliente WHERE id=? ', [req.params.id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }


}