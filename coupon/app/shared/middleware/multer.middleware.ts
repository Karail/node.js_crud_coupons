import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, '/usr/src/app/uploads/');
	},
	filename(req, file, cb) {
		cb(null, Date.now() + file.originalname.replace(/\s/g, ''));
	}
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export default multer({
	storage, fileFilter
});