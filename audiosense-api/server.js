import {app, inicializandoBancoDados} from './src/app.js'
import {PORT} from './config.js'

app.listen(PORT, async () =>{
    await inicializandoBancoDados()
    console.log("Servidor executando")
})