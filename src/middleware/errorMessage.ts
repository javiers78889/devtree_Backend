import type { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator"



export const errorMessage = async (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: errors })
    }
    else{
        next()
    }
}