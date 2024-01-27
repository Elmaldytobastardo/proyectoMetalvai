import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import "dotenv/config"
import productos from "./routes/productos.routes.js"
import admin from './routes/admin.routes.js'
import ventas from './routes/ventas.routes.js'
import clientes from './routes/clientes.routes.js'
import notificacion from './routes/notificacion.routes.js'


const app = express()
app.use(express.json())
app.disable('x-powered-by')
dotenv.config();

const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOption = {
    origin:function(origin,callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

//app.use(cors(corsOption))


app.use(admin)
app.use(productos)
app.use(clientes)
app.use(ventas)
app.use(notificacion)


app.use((req,res,next)=> {
    res.status(404).json({
        message: '404 NOT FOUND'
    })
})



const PORT = process.env.PORT ?? 1234
app.listen(PORT,()=>{
    
})