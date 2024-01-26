import {pool} from '../db.js'

export const getVentaByIdUser = async (req,res) =>{
     
    try {
        const rows = await pool.query('SELECT * FROM venta WHERE idusuario=$1',[req.params.id]) 
    
 res.send(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
    
    export const postVentas = async (req,res) => {
     
        const {nombre,fecha_venta,precio,idusuario,idcliente,productos} = req.body
        console.log(precio)  
            try { 
            const {rows} = await pool.query('INSERT INTO venta (nombre,fecha_venta,precio, idusuario, idcliente,productos) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[nombre,fecha_venta,precio,idusuario,idcliente,productos]) 
                
            return res.status(200).json({
                msg: 'Producto agregado'
            })
    
        } catch (error) {
            
          console.log(error)
      
            // return res.status(500).json({ 
            //     msg: 'Complete todos los campos'
            // })
        }
    
    
    }
 
    
    export const deleteVentas =  async (req,res) => {
        try {
            console.log(req.params.id)
            const result = await pool.query('DELETE FROM venta WHERE id=$1 ', [req.params.id]) 
           
             res.sendStatus(204)
        } catch (error) {
            return res.status(500).json({
                message: 'Se roaron la escobva'
            })
        }
     
    
    }
    
    export const getVenta = async (req,res) =>{
     
        try {
            const rows = await pool.query('SELECT * FROM venta') 
     res.send(rows)
        } catch (error) {
            return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    }

    export const getVentaId = async (req,res) =>{
     
        try {
            const rows = await pool.query('SELECT * FROM venta WHERE id=$1',[req.params.id]) 
        
     res.send(rows)
        } catch (error) {
            return res.status(500).json({
                message: 'Something goes wrong'
            })
        }
    }