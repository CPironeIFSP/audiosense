import { carregaAudioAws, deleteAudioAws } from './s3Service.js'
import { spCrudTag, verificaIdInstituicao } from './databaseService.js'

async function createTag(uid, idInstituicao, nomeObra, descricao, audio1, audio2) {

    if (!uid || !idInstituicao || !nomeObra) {
        const error = new Error("Os campos UID, idInstituicao e nomeObra são obrigatórios.");
        error.status = 400;
        throw error;
    }

    if (!audio1){
        const error = new Error("O primeiro audio é obrigatorio.");
        error.status = 400;
        throw error;
    }

    const [verificacaoInstituicao] = await verificaIdInstituicao(idInstituicao);

    if (!verificacaoInstituicao || verificacaoInstituicao.length === 0) {
        const error = new Error("A instituicao não existe na tabela");
        error.status = 400;
        throw error;
    }

    const urlAudio1 = await carregaAudioAws(audio1);

    const urlAudio2 = audio2 ? await carregaAudioAws(audio2) : null;

    if (!urlAudio1 || audio2 && !urlAudio2) {
        const error = new Error("Falha ao carregar os audios no aws.");
        error.status = 500;
        throw error;
    }

    const resultado = await spCrudTag(uid, idInstituicao, nomeObra, descricao || null, urlAudio1, urlAudio2, 1);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Nenhuma linha foi inserida. Operação falhou");
        error.status = 500;
        throw error;
    }

    return { message: "Tags adicionadas com sucesso!" };
}

async function getAllTagsFromInstitution(id){

    if(!id){
        const error = new Error("O id é necessario para a consulta.");
        error.status = 400;
        throw error;
    }

    const [resultado] = await spCrudTag(null, id, null, null, null, null, 2);

    if (!resultado || resultado.length === 0) {
        const error = new Error("Nenhuma tag atrelada a essa instituição.");
        error.status = 404;
        throw error;
    }

    return resultado;
}

async function updateTag(uid, nomeObra, descricao, audio1, audio2){

    if (!uid) {
        const error = new Error("O campo uid é obrigatório para atualizar a tag");
        error.status = 400;
        throw error;
    }

    if (!nomeObra){
        const error = new Error("O campo nome obra é obrigatorio");
        error.status = 400;
        throw error;
    }

    const [nomesAudios] = await spCrudTag(uid, null, null, null, null, null, 6);

    if (audio1){
        await deleteAudioAws(nomesAudios[0].NOME_AUDIO1);
    }
    if (audio2 && nomesAudios[0].NOME_AUDIO2){
        await deleteAudioAws(nomesAudios[0].NOME_AUDIO2);
    }

    const urlAudio1 = audio1 ? await carregaAudioAws(audio1) : null;

    const urlAudio2 = audio2 ? await carregaAudioAws(audio2) : null;


    const resultado = await spCrudTag(uid, null, nomeObra, descricao, urlAudio1, urlAudio2, 3);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Tag não encontrada.");
        error.status = 404;
        throw error;
    }

    return { message: "Tag alterada com sucesso!" };
}

async function deleteTag(uid){
    
    if (!uid) {
        const error = new Error("O campo uid é obrigatório para deletar a tag");
        error.status = 400;
        throw error;
    }

    const [nomesAudios] = await spCrudTag(uid, null, null, null, null, null, 6);

    await deleteAudioAws(nomesAudios[0].NOME_AUDIO1);
    if (nomesAudios[0].NOME_AUDIO2){
        await deleteAudioAws(nomesAudios[0].NOME_AUDIO2);
    }

    const resultado = await spCrudTag(uid, null, null, null, null, null, 4);

    if (!resultado || resultado.affectedRows === 0){
        const error = new Error("Tag não encontrada.");
        error.status = 404;
        throw error;
    }
}

async function getAudio(uid, tpUsuario){

    if (!uid) {
        const error = new Error("O campo uid é obrigatório");
        error.status = 400;
        throw error;
    }

    if (!tpUsuario) {
        const error = new Error("O campo tpUsuario é obrigatório");
        error.status = 400;
        throw error;
    }

    const [resultado] = await spCrudTag(uid, null, null, null, null, null, 5);

    if (!resultado || resultado.length === 0) {
        const error = new Error("Tag não encontrada.");
        error.status = 404;
        throw error;
    }

    const audios = resultado[0];

    tpUsuario = parseInt(tpUsuario);

    if (tpUsuario === 1){
        return { url: audios.URL1};
    }else if (tpUsuario === 2){
        return { url: audios.URL2};
    }
}

export { createTag, getAllTagsFromInstitution, updateTag, deleteTag, getAudio}