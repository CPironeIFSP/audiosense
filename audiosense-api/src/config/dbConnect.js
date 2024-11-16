import mysql from 'mysql2/promise'
import {DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE} from '../../config.js'

const configConexao = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

async function conectarBancoDados(){
    try{
        const pool = await mysql.createPool(configConexao)
        return pool
    }
    catch(erro){
        throw erro
    }
}

export default conectarBancoDados