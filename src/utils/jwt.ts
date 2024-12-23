import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


export const generateToken = (payload: JwtPayload) => {
    const palabra = process.env.JWT_SECRET;
    const token = jwt.sign(payload, palabra, {
        expiresIn: '1d'
    })

    return token
}