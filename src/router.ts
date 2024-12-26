
import { Router } from "express";
import { createUser, getUsers, login, updateUsers } from "./handlers";
import { body } from 'express-validator'
import { autenticate } from "./middleware/auth";
import { errorMessage } from "./middleware/errorMessage";


const router = Router()


router.post('/',

    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('email').isEmail().withMessage('email no valido'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password').isLength({ min: 8 }).withMessage('El password debe tener minimo 8 caracteres'),
    errorMessage,
    createUser)

router.post('/auth/login',
    body('email').isEmail().withMessage('email no valido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    errorMessage,

    login)

router.get('/users', autenticate, getUsers)
router.patch('/users', 
    
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    errorMessage,
    autenticate, updateUsers)

export default router;