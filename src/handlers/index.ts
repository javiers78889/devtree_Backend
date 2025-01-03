import { Error } from "mongoose"
import { User } from "../models/User"
import type { Response, Request, NextFunction } from "express"
import { checkPassword, hashpassword } from "../utils/aut"
import { param, validationResult } from "express-validator"
import slugify from "slugify"
import { generateToken } from "../utils/jwt"
import formidable from 'formidable'
import cloudinary from "../config/cloudinary"
import { v4 as uuid } from "uuid"


export const createUser = async (req: Request, res: Response) => {

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




export const login = async (req: Request, res: Response) => {
    const respuesta = []
    const { email, password } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: errors })
    }
    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error('Datos Incorrectos')
        res.status(401).json({ error: error.message })
    } else {
        const result = await checkPassword(password, user.password)
        if (result) {

            const jwt = generateToken({ id: user._id })
            respuesta.push(jwt)
            respuesta.push('Logueado')

            res.status(201).json(respuesta)

        } else {
            const error = new Error('Datos Incorrectos')
            res.status(401).json({ error: error.message })
        }

    }
}

export const getUsers = (req: Request, res: Response) => {

    res.status(202).json(req.user)

}
export const updateUsers = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body
        const handler = slugify(req.body.handle, '')
        const handlerExiste = await User.findOne({ handle: handler })
        if (handlerExiste && handlerExiste.email !== req.user.email) {
            const error = new Error('Este handler no esta disponible')
            res.status(400).json({ error: error.message })
        } else {


            req.user.description = description
            req.user.handle = handler
            req.user.links = links

            await req.user.save()
            res.status(201).json('Actualizado')
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }

}
export const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({ multiples: false })
    form.parse(req, (error, fields, files) => {

        cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async (error, result) => {
            if (error) {

                console.log(error)
            }
            if (result) {
                req.user.image = result.secure_url
                await req.user.save()
                res.json({ image: result.secure_url })
            }
        })
    })
    try {

    } catch (e) {
        const error = new Error('Hubo un error')
        res.status(500).json(error)

    }
}

export const getUserByHandler = async (req: Request, res: Response) => {
    try {
        const { handle } = req.params
        const response = await User.findOne({ handle }).select('-password -_id -email -__v')
        if (response) {
            res.status(201).json(response)

        } else {
            const error = new Error('No Hay Datos')
            res.status(404).json({ error: error.message })
        }
    } catch (e) {
        const error = new Error('Hubo un error')
        res.status(500).json({ error: error.message })
    }
}

export const findHandler = async (req: Request, res: Response) => {
    try {
        const { handle } = req.body

        const response = await User.findOne({ handle })
        if (response) {

            res.status(201).json(response)
        } else {
            const error = new Error('Usuario No Encontrado')
            res.status(404).json({ error: error.message })
        }

    } catch (e) {
        const error = new Error('Hubo un error')
        res.status(500).json({ error: error.message })
    }
}