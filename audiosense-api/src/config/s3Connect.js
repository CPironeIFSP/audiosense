import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION} from '../../config.js'

const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
});

export { s3, PutObjectCommand, DeleteObjectCommand }