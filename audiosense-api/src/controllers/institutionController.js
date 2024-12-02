import { createInstitution, getInstitutionDetails, updateInstitutionDetails, updateInstitutionPassword, deleteInstitution, authenticationInstitution, getAllInstitution } from "../services/institutionService.js"

async function createInstitutionController(req, res) {
    try {
        const resultado = await createInstitution(req.body);
        res.status(201).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function getInstitutionDetailsController(req, res){
    try{
        const { id } = req.query;
        const resultado = await getInstitutionDetails(id);
        res.status(200).json(resultado);
    } catch (erro){
        res.status(erro.status).json({ error: erro.message })
    }
}

async function updateInstitutionDetailsController(req, res) {
    try {
        const resultado = await updateInstitutionDetails(req.body);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function updateInstitutionPasswordController(req, res) {
    try {
        const resultado = await updateInstitutionPassword(req.body);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function deleteInstitutionController(req, res){
    try{
        const { id } = req.query;
        await deleteInstitution(id);
        res.status(204).send();
    } catch (erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

async function authenticationInstitutionController (req, res){
    try{
        const resultado = await authenticationInstitution(req.body);
        res.status(200).json(resultado);
    } catch(erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

async function getAllInstitutionController (req, res){
    try{
        const resultado = await getAllInstitution();
        res.status(200).json(resultado);
    } catch(erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

export { createInstitutionController, getInstitutionDetailsController, updateInstitutionDetailsController, updateInstitutionPasswordController, deleteInstitutionController, authenticationInstitutionController, getAllInstitutionController }