import { NextFunction, Response, Request } from "express"
import { jwtVerify } from "./jwtVerify"
import { TUser, User } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: TUser
        }
    }
}

export const autenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error('No hay token valido')
        res.status(401).json({ error: error.message })
    } else {
        const [, token] = bearer.split(' ')
        const verficar = jwtVerify(token)
        if (verficar.message) {
            res.status(500).json({ error: 'Token no valido' })
        } else {


            if (typeof verficar === 'object' && verficar.id) {
                try {
                    const usario = await User.findById(verficar.id).select('-password')
                    if (!usario) {
                        const error = new Error('El usuario no existe')
                        res.status(500).json({ mensaje: error })
                    }
                    req.user = usario
                    next()
                } catch (error) {
                    res.status(500).json({ mensaje: error })
                }

            }

        }
    }

}