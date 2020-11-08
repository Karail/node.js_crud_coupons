import { Request, Response } from 'express';
//Decorators
import { Bind } from '../shared/decorators/';
//Dto
import { CouponDto } from './dto/';
//Models
import { Coupon } from './models/';
//Services
import awsService, { AWSService } from '../aws/aws.service';
import fileService, { FileService } from '../shared/services/file.service';
//Logger
import { logger } from '../app.logger';

class CouponController {
    constructor(
        private readonly couponModel: typeof Coupon,
        private readonly awsService: AWSService,
        private readonly fileService: FileService
    ) { }

    @Bind
    public async findAll(req: Request, res: Response) {
        try {
            const coupons = await this.couponModel.findAll();
            res.json(coupons);
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }
    @Bind
    public async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const coupon = await this.couponModel.findOne({ where: { id } });
            res.json(coupon);
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }
    @Bind
    public async create(req: Request, res: Response) {
        try {
            const { feedId, name } = req.body as CouponDto;

            const icon = await this.awsService.uploadS3(
                req.file.path,
                req.file.filename,
                req.file.mimetype,
                process.env.S3_BUCKET_NAME, process.env.S3_IMAGE_FOLDER);

            const coupon = await this.couponModel.create({
                feedId,
                name,
                icon: icon.Location,
                iconFileName: icon.Key
            });

            await this.fileService.delete(req.file.path);
            res.json(coupon);
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }
    @Bind
    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { feedId, name } = req.body as CouponDto;

            const candidate = await this.couponModel.findOne({ where: { id } });

            if (!candidate) {
                return res.status(400).send({ message: "The coupon is not found" });
            }

            await this.awsService.deleteS3(
                candidate.iconFileName,
                process.env.S3_BUCKET_NAME, process.env.S3_IMAGE_FOLDER);

            const icon = await this.awsService.uploadS3(
                req.file.path,
                req.file.filename,
                req.file.mimetype,
                process.env.S3_BUCKET_NAME, process.env.S3_IMAGE_FOLDER);

            const result = await this.couponModel.update({
                feedId,
                name,
                icon: icon.Location,
                iconFileName: icon.Key
            },
                { where: { id } });
            await this.fileService.delete(req.file.path);
            res.json(result);
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }
    @Bind
    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const candidate = await this.couponModel.findOne({ where: { id } });

            if (!candidate) {
                return res.status(400).send({ message: "The coupon is not found" });
            }

            const result = await this.couponModel.destroy({ where: { id } });
            
            await this.awsService.deleteS3(
                candidate.iconFileName,
                process.env.S3_BUCKET_NAME, process.env.S3_IMAGE_FOLDER);

            res.json(result);
        } catch (ex) {
            logger.error(ex.message);
            res.status(500).send(ex);
        }
    }
}
export default new CouponController(Coupon, awsService, fileService);