import { CorsOptions } from 'cors'

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        const lista = [process.env.ORIGENES]

        if (process.argv[2] === '--api') {
            lista.push(undefined)
        }

        if (lista.includes(origin)) {
            callback(null, true)
        } else {
            
            callback(new Error('Error CORS'))
        }


    }

}