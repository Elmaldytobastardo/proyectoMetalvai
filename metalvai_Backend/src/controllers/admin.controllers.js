import {pool} from '../db.js'
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import generarJWT from '../helpers/generaJWT.js'


export const loginAdmin = async (req,res) => {
    const {email, password } = req.body
    const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?',[email]) 
    try {
        if(rows.length == 0 || !(await bcryptjs.compare(password,rows[0].password))) {
            return res.status(500).json({
                message: 'Usuario no existe'
            })
           }else{
            const id = rows[0].id
         
            res.json({
                id: id,
                nombre: rows[0].nombre,
                email: rows[0].email,
                token: generarJWT(id)})
           }
    }
       
     catch (error) {
     
        return res.status(500).json({
            message: 'Usuario no existe'
        })
    }
}




export const perfil = (req,res) => {
    
 const {admin} = req;

 res.json(admin[0])

  
}


export const createAdmin = async (req,res) => {
    const {nombre, pass, email,activa,rol,avatar } = req.body
    let passhash = await bcryptjs.hash(pass, 8)
  
 
    try {
        const [rows] = await pool.query('INSERT INTO usuario (nombre,password, email,activa,rol,avatar) VALUES(?,?,?,?,?,?)',[nombre,passhash,email,activa,rol,avatar]) 
        
         
     res.send({  
         
         id: rows.insertId,
         nombre, 
         passhash,
         email,
         activa,
         rol,
         avatar

     })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }


}