import { createTag, getAllTagsFromInstitution, updateTag, deleteTag, getAudio} from '../services/tagService.js'

async function createTagController(req, res) {
    try {
        const { uid, idInstituicao, nomeObra, descricao } = req.body;

        const audio1 = req.files?.audio1 ? req.files.audio1[0] : null;
        const audio2 = req.files?.audio2 ? req.files.audio2[0] : null;

        const resultado = await createTag(uid, idInstituicao, nomeObra, descricao, audio1, audio2);
        res.status(201).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function getAllTagsFromController(req, res){
    try{
        const { id } = req.query;
        const resultado = await getAllTagsFromInstitution(id);
        res.status(200).json(resultado);
    } catch (erro){
        res.status(erro.status).json({ error: erro.message })
    }
}

async function updateTagController(req, res) {
    const { uid, nomeObra, descricao } = req.body;
    
    const audio1 = req.files?.audio1 ? req.files.audio1[0] : null;
    const audio2 = req.files?.audio2 ? req.files.audio2[0] : null;

    try {
        const resultado = await updateTag(uid, nomeObra, descricao, audio1, audio2);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(erro.status).json({ error: erro.message });
    }
}

async function deleteTagController(req, res){
    try{
        const { uid } = req.query;
        await deleteTag(uid);
        res.status(204).send();
    } catch (erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

async function getAudioController(req, res){
    try{
        const { uid, tpUsuario } = req.query;
        const resultado = await getAudio(uid, tpUsuario);
        res.status(200).json(resultado);
    } catch(erro){
        res.status(erro.status).json({ error: erro.message });
    }
}

export { createTagController, getAllTagsFromController, updateTagController, deleteTagController, getAudioController }