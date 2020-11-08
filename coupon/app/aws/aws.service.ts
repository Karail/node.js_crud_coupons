import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
//S3
import { s3 } from './config/s3.config';
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
	): Promise<ManagedUpload .SendData> {
		try {
			const data = await this.fileService.read(filePath);
			const params = {
				Bucket: `${bucket}/${folder}`,
				Key: iFile,
				Body: data,
				ContentType: mimetype,
				ACL: 'public-read',
			};
			return s3.upload(params).promise();
		} catch (ex) {
			logger.error(ex.message);
			throw new Error(ex);
		}
	}
	public async deleteS3(
		key: string,
		folder: string,
		bucket: string): Promise<S3.DeleteObjectOutput> {

		const params = {
			Bucket: `${bucket}/${folder}`,
			Key: key
		};

		return new Promise((resolve, reject) => {
			s3.deleteObject(params, (err, data) => {
				if (err)
					return reject(err);
				resolve(data);
			});
		});
	}
}
export default new AWSService(fileService);