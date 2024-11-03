import express from 'express'
import conectarBancoDados from './config/dbConnect.js'
import s3 from './config/s3Connect.js'
import {AWS_BUCKET_NAME} from '../config.js'

const app = express()
app.use(express.json())

let pool

async function inicializandoBancoDados() {
    pool = await conectarBancoDados();
}

export {app, inicializandoBancoDados}