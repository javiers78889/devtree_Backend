import express, { Router, urlencoded } from 'express'
import router from './router';
import { connectDB } from './config/db';

const app = express()

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

export default app;