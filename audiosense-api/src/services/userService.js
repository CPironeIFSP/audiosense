import { spCrudUsuario } from "./databaseService.js";
import { JWT_SECRET } from "../../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(dados){

    const {id = null, nome, email, senha, tpUsuario} = dados;

    if (id != null){
        const error = new Error("O campo id precisa ser nulo");
        error.status = 400;
        throw error;
    }

    if (!nome || !email || !senha || !tpUsuario){
        const error = new Error("Os campos nome, email, senha e tpUsuario são obrigatorios");
        error.status = 400;
        throw error;
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const resultado = await spCrudUsuario(id, nome, email, senhaCriptografada, tpUsuario, 1);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Nenhuma linha foi inserida. Operação falhou");
        error.status = 500;
        throw error;
    }

    return { message: "Usuário criado com sucesso!" };
}

async function getUserDetails(id){

    if (!id){
        const error = new Error("O campo id é obrigatorio para a consulta dos dados");
        error.status = 400;
        throw error;
    }

    const [resultado] = await spCrudUsuario(id, null, null, null, null, 5);

    if (!resultado || resultado.length === 0) {
        const error = new Error("Usuário não encontrado.");
        error.status = 404;
        throw error;
    }

    return resultado[0];
}

async function updateUserDetails(dados){

    const {id, nome, email, tpUsuario} = dados;

    if (!id) {
        const error = new Error("O campo id é obrigatório para atualizar o usuário");
        error.status = 400;
        throw error;
    }

    if (!nome || !email || !tpUsuario){
        const error = new Error("Os campos nome, email e tpUsuario são obrigatorios");
        error.status = 400;
        throw error;
    }

    const resultado = await spCrudUsuario(id, nome, email, null, tpUsuario, 3);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Usuário não encontrado.");
        error.status = 404;
        throw error;
    }

    return { message: "Usuário alterado com sucesso!" };
}

async function updateUserPassword(dados) {
    
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

    const resultado = await spCrudUsuario(id, null, null, novaSenhaCriptografada, null, 6);

    if (!resultado || resultado.affectedRows === 0) {
        const error = new Error("Usuário não encontrado.");
        error.status = 404;
        throw error;
    }

    return { message: "Senha atualizada com sucesso!" };
}

async function deleteUser(id){

    if(!id){
        const error = new Error("O campo id é obrigatorio para a deleção do usuario");
        error.status = 400;
        throw error;
    }

    const resultado = await spCrudUsuario(id, null, null, null, null, 4);

    if (!resultado || resultado.affectedRows === 0) {
        const error = new Error("Usuário não encontrado.");
        error.status = 404;
        throw error;
    }
}

async function authenticationUser(dados){

    const secretKey = JWT_SECRET;

    const { email, senha } = dados;

    if(!email || !senha){
        const error = new Error("Os campos email e senha são obrigatórios.");
        error.status = 400;
        throw error;
    }

    const [resultado] = await spCrudUsuario(null, null, email, null, null, 2);
    
    if (!resultado || resultado.length === 0) {
        const error = new Error("Usuário não encontrado.");
        error.status = 404;
        throw error;
    }

    const usuario = resultado[0];

    const senhaValida = await bcrypt.compare(senha, usuario.SENHA);
    
    if (!senhaValida) {
        const error = new Error("Senha incorreta.");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, tpUsuario: usuario.tp_usuario, role: "user" },
        secretKey,
        { expiresIn: "8h" }
    );

    return { 
        message: "Autenticado com sucesso!",
        token,
        usuario: { id: usuario.id, email: usuario.email, tpUsuario: usuario.tp_usuario, role: "user" }
    };
}

export { createUser, getUserDetails, updateUserDetails, updateUserPassword, deleteUser, authenticationUser }