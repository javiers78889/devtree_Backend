import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"

export const jwtVerify =  (token: string) => {
    try {
        const verficar = jwt.verify(token, process.env.JWT_SECRET)
        return verficar
    } catch (error) {
    
        return error
    }
    
}