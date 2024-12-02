import { spCrudInstituicao } from "./databaseService.js";
import { JWT_SECRET } from "../../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createInstitution(dados){

    const {id = null, nome, email, senha, cnpj, endereco, bairro, numero, estado,cep} = dados;

    if (id != null){
        throw new Error("O campo id precisa ser nulo");
    }

    if (!nome || !email || !senha || !cnpj){
        throw new Error("Os campos nome, email, senha e cnpj são obrigatorios");
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const resultado = await spCrudInstituicao(id, nome, email, senhaCriptografada, cnpj, endereco, bairro, numero, estado, cep, 1);

    if (!resultado || resultado.affectedRows === 0){
        throw new Error("Nenhuma linha foi inserida. Operação falhou");
    }

    return { message: "Instituicao criada com sucesso!" };
}

async function getInstitutionDetails(id){

    if (!id){
        throw new Error("O campo id é obrigatorio para a consulta dos dados");
    }

    const resultado = await spCrudInstituicao(id, null, null, null, null, null, null, null, null, null, 2);

    if (!resultado || resultado.length === 0) {
        throw new Error("Instituição não encontrada.");
    }

    return resultado[0];
}

async function updateInstitutionDetails(dados){

    const {id, nome, email, cnpj, endereco, bairro, numero, estado, cep} = dados;

    if (!id) {
        throw new Error("O campo id é obrigatório para atualizar o usuário");
    }

    if (!nome || !email || !cnpj){
        throw new Error("Os campos nome, email e cnpj são obrigatorios");
    }

    const resultado = await spCrudInstituicao(id, nome, email, null, cnpj, endereco, bairro, numero, estado, cep, 3);

    if (!resultado || resultado.affectedRows === 0){
        throw new Error("Nenhuma linha foi atualizada. Operação falhou");
    }

    return { message: "Instituicao alterada com sucesso!" };
}

async function updateInstitutionPassword(dados) {
    
    const { id, novaSenha } = dados;

    if (!id) {
        throw new Error("O campo id é obrigatório para atualizar a senha.");
    }

    if (!novaSenha) {
        throw new Error("O campo novaSenha é obrigatório.");
    }

    const saltRounds = 10;
    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, saltRounds);

    const resultado = await spCrudInstituicao(id, null, null, novaSenhaCriptografada, null, null, null, null, null, null, 6);

    if (!resultado || resultado.affectedRows === 0) {
        throw new Error("A senha não foi atualizada. Operação falhou.");
    }

    return { message: "Senha atualizada com sucesso!" };
}

async function deleteInstitution(id){

    if(!id){
        throw new Error("O campo id é obrigatorio para a deleção da instituicao");
    }

    const resultado = await spCrudInstituicao(id, null, null, null, null, null, null, null, null, null, 4);

    if (!resultado || resultado.affectedRows === 0) {
        throw new Error("A instituicao não foi deletada. Operação falhou.");
    }

    return { message: "instituicao deletada com sucesso!" };
}

async function authenticationInstitution(dados){

    const secretKey = JWT_SECRET;

    const { email, senha } = dados;

    if(!email || !senha){
        throw new Error("Os campos email e senha são obrigatórios.");
    }

    const resultado = await spCrudInstituicao(null, null, email, null, null, null, null, null, null, null, 5);
    
    if (!resultado || resultado.length === 0) {
        throw new Error("Instituicao não encontrada.");
    }

    const instituicao = resultado[0];

    const senhaValida = await bcrypt.compare(senha, instituicao.senha);
    if (!senhaValida) {
        throw new Error("Senha incorreta.");
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

    const resultado = await spCrudInstituicao(null, null, null, null, null, null, null, null, null, null, 7);

    return resultado[0];
    
}