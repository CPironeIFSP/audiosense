import app from './src/app.js'
import {inicializandoBancoDados} from './src/services/databaseService.js'
import {PORT} from './config.js'

app.listen(PORT, async () =>{
    try{
        await inicializandoBancoDados()
        console.log("Servidor executando")
    }catch(erro){
        throw erro
    }
})