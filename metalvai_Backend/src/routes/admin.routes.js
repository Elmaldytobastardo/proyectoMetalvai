import { Router } from "express";
import {loginAdmin, perfil, createAdmin} from '../controllers/admin.controllers.js'
import checkAuth from "../middleware/authMiddleware.js";
const router = Router()

router.post('/loginAdmin',loginAdmin)
router.post('/createAdmin',createAdmin)

router.get('/getAdmin',checkAuth,perfil)







export default router