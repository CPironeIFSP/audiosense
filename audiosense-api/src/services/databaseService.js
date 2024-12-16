import conectarBancoDados from '../config/dbConnect.js'

let pool

async function inicializandoBancoDados() {
    pool = await conectarBancoDados();
}

async function spCrudUsuario(id,nome, email, senha, tpUsuario, crud){
    try{
        const [rows] = await pool.query(
            `CALL SP_CRUD_USUARIO (?, ?, ?, ?, ?, ?)`,
            [id,nome, email, senha, tpUsuario, crud]
        )
        return rows
    } catch(erro){
        console.error('Erro ao executar SP_CRUD_USUARIO:', erro)
    }
}

async function spCrudTag(uid, id_instituicao, nome_obra, descricao, url1, url2, crud){
    try{
        const [rows] = await pool.query(
            `CALL SP_CRUD_TAG (?, ?, ?, ?, ?, ?, ?)`,
            [uid, id_instituicao, nome_obra, descricao, url1, url2, crud]
        )
        return rows
    }catch(erro){
        console.error('Erro ao executar SP_CRUD_TAG:', erro)
    }
}

async function spCrudInstituicao(id, nome, email, senha, cnpj, endereco, bairro, numero, estado, cep, crud){
    try{
        const [rows] = await pool.query(
            `CALL SP_CRUD_INSTITUICAO (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, nome, email, senha, cnpj, endereco, bairro, numero, estado, cep, crud]
        )
        return rows
    }catch(erro){
        console.error('Erro ao executar SP_CRUD_INSTITUICAO:', erro)
    }
}

async function verificaIdInstituicao(idInstituicao){
    try{
        const [rows] = await pool.query(
            `SELECT * FROM TB_INSTITUICAO WHERE ID = ?`,
            [idInstituicao]
        )
        return rows
    }catch(erro){
        console.error('Erro ao executar a verificacao de instituicao:', erro)
    }
}

export {inicializandoBancoDados, spCrudUsuario, spCrudTag, spCrudInstituicao, verificaIdInstituicao}