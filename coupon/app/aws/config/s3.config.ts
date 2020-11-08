import AWS_SDK from 'aws-sdk';

AWS_SDK.config.update(
	{
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
	}
);

export const s3 = new AWS_SDK.S3();