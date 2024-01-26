import { pool } from "../db.js";
import "dotenv/config"
const checkStock = async (req,res,next) => {
    const {productos} = req.body
   
    try {
        
        const productosParse = JSON.parse(productos)
            for (let i =0; i < productosParse.length; i++) {
                const getStock = await pool.query('SELECT stock FROM producto WHERE id = $1 ', [productosParse[i].id]) 
               
                const restarStock = getStock.rows[0].stock - productosParse[i].cantidad
                console.log(getStock.rows[0].stock)
                if(restarStock <= 0 ){
                     return  res.status(500).json({msg: 'La cantidad excede al stock actual o No hay stock'});
                 }  else{
                    const result = await pool.query('UPDATE producto SET stock = ($1) WHERE id = $2', [restarStock,productosParse[i].id])  
                 }
                   
                    
                  } 
               
         } catch (error) {
            console.log(error)
            return res.status(500).json({ 
                msg: 'Complete todos los campos'
            })
         } 
    
    next();
};

export default checkStock;