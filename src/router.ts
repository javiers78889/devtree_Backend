
import { Router } from "express";
import { createUser, getUsers, login } from "./handlers";
import { body } from 'express-validator'
import { autenticate } from "./middleware/auth";


const router = Router()


router.post('/',

    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('email').isEmail().withMessage('email no valido'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').isLength({ min: 8 }).withMessage('El password debe tener minimo 8 caracteres'),
    createUser)

router.post('/auth/login',
    body('email').isEmail().withMessage('email no valido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),

    login)

router.get('/users', autenticate, getUsers)

export default router;