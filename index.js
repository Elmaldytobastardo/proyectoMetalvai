const express= require('express')
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234


app.get('/', (req,res) =>{
    res.status(200).send('olaaaaasdfasdfsdfsafasdfaaasdasda')
})

app.listen(PORT,()=>{
 
})