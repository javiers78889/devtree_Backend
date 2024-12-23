import express, { Router, urlencoded } from 'express'
import router from './router';
import { connectDB } from './config/db';
import cors from 'cors'
import { corsConfig } from './config/cors';

const app = express()

connectDB()
app.use(express.json())
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

export default app;