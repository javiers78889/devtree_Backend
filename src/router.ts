
import { Router } from "express";
import { User } from "./models/User";

const router = Router()


router.post('/', async (req, res) => {

    await User.create(req.body)
    res.json({ mensaje: 'creado' })

})



export default router;