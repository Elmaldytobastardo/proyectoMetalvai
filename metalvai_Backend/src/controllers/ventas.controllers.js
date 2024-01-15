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
        const {nombre,fecha_venta,precio,idusuario,idcliente,productos} = req.body
        try {
            const [rows] = await pool.query('INSERT INTO venta (nombre,fecha_venta,precio, idusuario, idcliente,productos) VALUES(?,?,?,?,?,?)',[nombre,fecha_venta,precio,idusuario,idcliente,productos]) 
              
         res.send({
             id: rows.insertId,
             nombre,
             fecha_venta,
             precio,
             idusuario,
             idcliente,
             productos
         })
        } catch (error) {
           
            return res.status(500).json({
                msg: 'Complete todos los campos'
            })
        }
    
    
    }
    
    
    
    
    
    
    export const deleteVentas =  async (req,res) => {
        try {
            const [result] = await pool.query('DELETE FROM venta WHERE id=? ', [req.params.id]) 
           
            if (result.affectedRows <= 0  ){ 
             return res.status(404).json({ message: 'Producto no encontrado'})
            }
    
             res.sendStatus(204)
        } catch (error) {
            return res.status(500).json({
                message: 'Se roaron la escobva'
            })
        }
     
    
    }
    
    export const getVentaId = async (req,res) =>{
     
        try {
            const [rows] = await pool.query('SELECT * FROM venta WHERE id=?',[req.params.id]) 
         if (rows.length <= 0 )return res.status(404).json({
            message: 'Producto no encontrado'
         })
     res.send({rows})
        } catch (error) {
            return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    }