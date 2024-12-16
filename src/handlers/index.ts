import { Error } from "mongoose"
import { User } from "../models/User"
import type { Response, Request } from "express"
import { checkPassword, hashpassword } from "../utils/aut"
import { validationResult } from "express-validator"
import slugify from "slugify"


export const createUser = async (req: Request, res: Response) => {


    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: errors })
    } else {
        const { email, password, handle } = req.body
        const eslug = slugify(handle, '')

        const handler = await User.findOne({ handle: eslug })
        const usuario = await User.findOne({ email })
        if (usuario) {
            const error = new Error('Usuario Ya existe')
            res.status(400).json({ error: error.message })
        } else {
            if (handler) {
                const error = new Error('este handler Ya existe')
                res.status(400).json({ error: error.message })
            } else {
                const user = new User(req.body)
                user.password = await hashpassword(password)
                user.handle = eslug
                user.save()
                res.status(201).json({ mensaje: 'creado' })
            }
        }
    }

}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: errors })
    }
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('Este usuario no existe')
        res.status(401).json({ error: error.message })
    } else {
        const result = await checkPassword(password, user.password)
        if (result) {
            res.status(200).json('Logueado')

        } else {
            const error = new Error('Contraseña Incorrecta')
            res.status(401).json({ error: error.message })
        }

    }
}