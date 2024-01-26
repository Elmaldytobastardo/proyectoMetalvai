import {pool} from '../db.js'


export const getClientes = async (req,res) => {
try {
   
    const rows = await pool.query('SELECT * FROM cliente') 
   
     
 res.send(rows)
} catch (error) {
    return res.status(500).json({
        message: 'No hay clientes agregados'
    })
}
 
}

export const getClienteById = async (req, res) => {

    try {
        const rows = await pool.query('SELECT * FROM cliente WHERE idusuario=$1', [req.params.id])
       
        res.send(rows )
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const createCliente = async (req, res) => {
    const { nombre, detalle, idusuario } = req.body
    const existe = await pool.query('SELECT * FROM cliente WHERE nombre =$1', [nombre])
    if (existe.rows.length > 0) {
        const error = new Error('Cliente ya registrado');
        return res.status(400).json({ msg: error.message });
    }
    try {
        
        const {rows} = await pool.query('INSERT INTO cliente (nombre,detalle,idusuario) VALUES($1,$2,$3)', [nombre, detalle, idusuario])
        
        return res.status(200).json({
            msg: 'Producto agregado'
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
    
 

    try {

        const result = await pool.query('UPDATE cliente SET nombre = ($1), detalle = ($2),  idusuario = ($3) WHERE id = $4 RETURNING *',
            [nombre, detalle, idusuario, id])



        const rows = await pool.query('SELECT * FROM cliente WHERE id = $1', [id])
        res.json(rows)



    } catch (error) {
        
        return res.status(500).json({
            msg: 'Something goes wrong'
        })
    }


}

export const deleteCliente = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM cliente WHERE id=$1 ', [req.params.id])

   
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }


}