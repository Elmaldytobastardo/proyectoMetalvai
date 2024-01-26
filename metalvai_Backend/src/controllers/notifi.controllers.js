import { pool } from '../db.js'
import webpush from 'web-push'

webpush.setVapidDetails('mailto:loopx14@gmail.com', process.env.KEY_PUBLIC, process.env.KEY_PRIV);
let pushSubscription;

const enviarNotificacion = async (req, res) => {
   
  const pushSubscription = req.body  
  // const {id} = req.body
  // for (let i =0; i < productosParse.length; i++) {
             
  //   const [getStock] = await pool.query('SELECT stock FROM producto WHERE id = ? ', [id]) 
  //   console.log(getStock)
 
  // }
        const payload = JSON.stringify({tittle: 'Stock Critico', message:'holis'})
        try {
            console.log() 
          await  webpush.sendNotification(pushSubscription.subscription, payload);   
        } catch (error) {
            console.log(error)
        }
        
    // const [row] = pool.query('SELECT * FROM producto WHERE = id', [idProd])
    // console.log(row) 
     
 
    // if (row[0].stock < row[0].stock_critico) {
    //   const payload = JSON.stringify({ title: 'Stock Crítico', body: `El stock de ${row[0].nombre} está por debajo del límite crítico.` });
  
    //   webPush.sendNotification(subscription, payload)
    //     .then(() => res.sendStatus(200))
    //     .catch((error) => res.status(500).json({ error: 'Error al enviar la notificación', details: error }));
    // } else {
    //   res.sendStatus(200);
    // }
  }

export default enviarNotificacion
