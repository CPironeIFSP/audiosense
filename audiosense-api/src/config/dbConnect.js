import mssql from 'mssql'
import {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} from '../../config.js'

const configConexao = {
    user: DB_USER,
    password: DB_PASSWORD,
    server: DB_SERVER,
    database: DB_DATABASE,
    options: {
        trustServerCertificate: true
    }
}

async function conectarBancoDados(){
    try{
        const pool = await new mssql.ConnectionPool(configConexao).connect()
        return pool
    }
    catch(erro){
        console.log("Falha ao conectar no banco de dados ", erro)
    }
}

export default conectarBancoDados