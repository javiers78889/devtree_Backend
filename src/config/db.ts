import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()
const url = process.env.DATABASE_URL

export const connectDB = async () => {
    try {
      
        const {connection} = await mongoose.connect(url)

        const url2 = `${connection.host}:${connection.port}`

        console.log(colors.cyan.bold(`Mongo Connectado en ${url2}`))
       
        

    } catch (error) {
        console.error(error)

    }
}