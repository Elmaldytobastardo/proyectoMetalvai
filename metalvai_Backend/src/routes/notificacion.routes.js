import { Router } from "express";
import  enviarNotificacion  from '../controllers/notifi.controllers.js';
const router = Router()

router.post('/activarNoti',enviarNotificacion)
router.post('/notificacion')

export default router 