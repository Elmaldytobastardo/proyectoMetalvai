const express= require('express')
const app = express()
app.disable('x-powered-by')
app.get('/', (req,res) =>{
    res.status(200).send('olaaa')
})

app.listen(6969,()=>{

})