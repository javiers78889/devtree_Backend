import app from './server'
import colors from 'colors'
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(colors.magenta.bold(`Servidor Funcionando en el puerto ${port}`))
})