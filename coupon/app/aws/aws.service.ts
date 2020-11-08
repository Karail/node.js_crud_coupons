//S3
import { S3 } from './config/s3.config';
//Services
import fileService, { FileService } from '../shared/services/file.service';
//Logger
import { logger } from '../app.logger';

export class AWSService {
    constructor(
        private readonly fileService: FileService
    ) { }

    public async uploadS3(
        filePath: string,
        iFile: string,
        mimetype: string,
        folder: string,
        bucket: string
    ) {
        try {
            const data = await this.fileService.read(filePath);
            const params = {
                Bucket: `${bucket}/${folder}`,
                Key: iFile,
                Body: data,
                ContentType: mimetype,
                ACL: 'public-read',
            }
            return S3.upload(params).promise();
        } catch (ex) {
            logger.error(ex.message);
            throw new Error(ex);
        }
    }
    public async deleteS3(
        key: string,
        folder: string,
        bucket: string) {

        const params = {
            Bucket: `${bucket}/${folder}`,
            Key: key
        };

        return new Promise((resolve, reject) => {
            S3.deleteObject(params, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
}
export default new AWSService(fileService);