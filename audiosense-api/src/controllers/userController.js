import { createUser, getUserDetails, updateUserDetails, updateUserPassword, deleteUser, authenticationUser } from "../services/userService.js"

async function createUserController(req, res) {
    try {
        const resultado = await createUser(req.body);
        res.status(201).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function getUserDetailsController(req, res){
    try{
        const { id } = req.query;
        const resultado = await getUserDetails(id);
        res.status(200).json(resultado);
    } catch (erro){
        res.status(erro.status).json({ error: erro.message })
    }
}

async function updateUserDetailsController(req, res) {
    try {
        const resultado = await updateUserDetails(req.body);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function updateUserPasswordController(req, res) {
    try {
        const resultado = await updateUserPassword(req.body);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function deleteUserController(req, res){
    try{
        const { id } = req.query;
        await deleteUser(id);
        res.status(204).send();
    } catch (erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

async function authenticationUserController (req, res){
    try{
        const resultado = await authenticationUser(req.body);
        res.status(200).json(resultado);
    } catch(erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

export { createUserController, getUserDetailsController, updateUserDetailsController, updateUserPasswordController, deleteUserController, authenticationUserController }