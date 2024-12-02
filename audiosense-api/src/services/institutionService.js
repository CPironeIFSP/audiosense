import { spCrudInstituicao } from "./databaseService.js";
import { JWT_SECRET } from "../../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createInstitution(dados){

    const {id = null, nome, email, senha, cnpj, endereco, bairro, numero, estado,cep} = dados;

    if (id != null){
        const error = new Error("O campo id precisa ser nulo");
        error.status = 400;
        throw error;
    }

    if (!nome || !email || !senha || !cnpj){
        const error = new Error("Os campos nome, email, senha e cnpj são obrigatorios");
        error.status = 400;
        throw error;
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const resultado = await spCrudInstituicao(id, nome, email, senhaCriptografada, cnpj, endereco, bairro, numero, estado, cep, 1);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Nenhuma linha foi inserida. Operação falhou");
        error.status = 500;
        throw error;
    }

    return { message: "Instituicao criada com sucesso!" };
}

async function getInstitutionDetails(id){

    if (!id){
        const error = new Error("O campo id é obrigatorio para a consulta dos dados");
        error.status = 400;
        throw error;
    }

    const [resultado] = await spCrudInstituicao(id, null, null, null, null, null, null, null, null, null, 2);

    if (!resultado || resultado.length === 0) {
        const error = new Error("Instituição não encontrada.");
        error.status = 404;
        throw error;
    }

    return resultado[0];
}

async function updateInstitutionDetails(dados){

    const {id, nome, email, cnpj, endereco, bairro, numero, estado, cep} = dados;

    if (!id) {
        const error = new Error("O campo id é obrigatório para atualizar a instituicao");
        error.status = 400;
        throw error;
    }

    if (!nome || !email || !cnpj){
        const error = new Error("Os campos nome, email e cnpj são obrigatorios");
        error.status = 400;
        throw error;
    }

    const resultado = await spCrudInstituicao(id, nome, email, null, cnpj, endereco, bairro, numero, estado, cep, 3);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Instituição não encontrado.");
        error.status = 404;
        throw error;
    }

    return { message: "Instituicao alterada com sucesso!" };
}

async function updateInstitutionPassword(dados) {
    
    const { id, novaSenha } = dados;

    if (!id) {
        const error = new Error("O campo id é obrigatório para atualizar a senha.");
        error.status = 400;
        throw error;
    }

    if (!novaSenha) {
        const error = new Error("O campo novaSenha é obrigatório.");
        error.status = 400;
        throw error;
    }

    const saltRounds = 10;
    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, saltRounds);

    const resultado = await spCrudInstituicao(id, null, null, novaSenhaCriptografada, null, null, null, null, null, null, 6);

    if (!resultado || resultado.affectedRows === 0) {
        const error = new Error("Instituição não encontrada.");
        error.status = 404;
        throw error;
    }

    return { message: "Senha atualizada com sucesso!" };
}

async function deleteInstitution(id){

    if(!id){
        const error = new Error("O campo id é obrigatorio para a deleção da instituicao");
        error.status = 400;
        throw error;
    }

    const resultado = await spCrudInstituicao(id, null, null, null, null, null, null, null, null, null, 4);

    if (!resultado || resultado.affectedRows === 0) {
        const error = new Error("Instituição não encontrada.");
        error.status = 404;
        throw error;
    }

    return { message: "instituicao deletada com sucesso!" };
}

async function authenticationInstitution(dados){

    const secretKey = JWT_SECRET;

    const { email, senha } = dados;

    if(!email || !senha){
        const error = new Error("Os campos email e senha são obrigatórios.");
        error.status = 400;
        throw error;
    }

    const [resultado] = await spCrudInstituicao(null, null, email, null, null, null, null, null, null, null, 5);
    
    if (!resultado || resultado.length === 0) {
        const error = new Error("Instituicao não encontrada.");
        error.status = 404;
        throw error;
    }

    const instituicao = resultado[0];

    const senhaValida = await bcrypt.compare(senha, instituicao.SENHA);
    
    if (!senhaValida) {
        const error = new Error("Senha incorreta.");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: instituicao.id, email: instituicao.email, role: "institution" },
        secretKey,
        { expiresIn: "8h" }
    );

    return { 
        message: "Autenticado com sucesso!",
        token,
        usuario: { id: instituicao.id, email: instituicao.email, role: "institution" }
    };
}

async function getAllInstitution() {

    const [resultado] = await spCrudInstituicao(null, null, null, null, null, null, null, null, null, null, 7);

    if (!resultado || resultado.length === 0) {
        const error = new Error("Nenhuma instituição na tabela.");
        error.status = 404;
        throw error;
    }

    return resultado;
    
}

export { createInstitution, getInstitutionDetails, updateInstitutionDetails, updateInstitutionPassword, deleteInstitution, authenticationInstitution, getAllInstitution }