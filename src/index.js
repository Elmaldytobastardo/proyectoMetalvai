import express from "express"
import dotenv from "dotenv"

import productos from "./routes/productos.routes.js"
const app = express()

app.disable('x-powered-by')


dotenv.config();
app.use(express.json())

app.use(productos)


const PORT = process.env.PORT ?? 1234
app.listen(PORT,()=>{
    
})