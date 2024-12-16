import { Error } from "mongoose"
import { User } from "../models/User"
import type { Response, Request } from "express"
import { hashpassword } from "../utils/aut"
import { validationResult } from "express-validator"
import slugify from "slugify"


export const createUser = async (req: Request, res: Response) => {


    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: errors })
    } else {
        const { email, password, handle } = req.body
        const eslug = slugify(handle, '')

        const usuario = await User.findOne({ email })
        const handler = await User.findOne({ handle: eslug })
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
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: errors })
    } 
}