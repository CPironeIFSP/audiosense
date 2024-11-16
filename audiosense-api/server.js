import {app, inicializandoBancoDados} from './src/app.js'
import {PORT} from './config.js'

app.listen(PORT, async () =>{
    try{
        await inicializandoBancoDados()
        console.log("Servidor executando")
    }catch(erro){
        throw erro
    }
})