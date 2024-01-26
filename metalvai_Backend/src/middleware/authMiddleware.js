import jwt from "jsonwebtoken"
import { pool } from "../db.js";
import "dotenv/config"
const checkAuth = async (req,res,next) => {
   if(req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")){
    let token;
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await pool.query('SELECT id,nombre,email FROM usuario WHERE id = $1',[decoded.id]) 
        return next();

    } 
    catch (error) {
        console.log(error)
        const e = new Error('Token no Valido o inexistente')
     return res.status(403).json({msg: e.message});
    }
    
   } 
   if(!token){
   const error = new Error('Token no Valido o inexistente')
   res.status(403).json({msg: error.message});
}
    next();
};

export default checkAuth;