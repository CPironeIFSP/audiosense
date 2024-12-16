import { s3, PutObjectCommand, DeleteObjectCommand } from '../config/s3Connect.js'
import { AWS_BUCKET_NAME, AWS_REGION } from '../../config.js'

async function carregaAudioAws(audio){

    const fileName = `${Date.now()}-${audio.originalname}`;
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: audio.buffer,
        ContentType: audio.mimetype,
    };

    try {
        const command = new PutObjectCommand(params)
        await s3.send(command);
        return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (erro) {
        console.error('Erro ao fazer upload no s3:', erro);
    }

}

async function deleteAudioAws(key) {

        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: key,
        };
    
    try{
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
    } catch (error) {
        console.error('Erro ao excluir o arquivo do S3:', error);
    }
}

export { carregaAudioAws, deleteAudioAws };