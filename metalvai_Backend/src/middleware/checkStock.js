import { pool } from "../db.js";
import "dotenv/config"
const checkStock = async (req,res,next) => {
    const {productos} = req.body
    try {
        const productosParse = JSON.parse(productos)
            for (let i =0; i < productosParse.length; i++) {
             
                const [getStock] = await pool.query('SELECT stock FROM producto WHERE id = ? ', [productosParse[i].id]) 
                const restarStock = getStock[0].stock - productosParse[i].cantidad
                if(restarStock <= 0 || getStock[0].stock <= 0 ){
                     return  res.status(500).json({msg: 'La cantidad excede al stock actual o No hay stock'});
                 }  else{
                    const [result] = await pool.query('UPDATE producto SET stock = IFNULL(?,stock) WHERE id = ?', [restarStock,productosParse[i].id])  
                 }
                   
                    
                  } 
               
         } catch (error) {
            
            return res.status(500).json({ 
                msg: 'Complete todos los campos'
            })
         } 
    
    next();
};

export default checkStock;