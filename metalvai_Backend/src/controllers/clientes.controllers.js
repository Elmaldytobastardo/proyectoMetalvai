import {pool} from '../db.js'




export const getClientes = async (req,res) => {
try {
   
    const [rows] = await pool.query('SELECT * FROM cliente') 
   
     
 res.send({rows})
} catch (error) {
    return res.status(500).json({
        message: 'Quedó la pala'
    })
}
 
}

