import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//Decorators
import { Bind } from '../shared/decorators/';
//Dto
import { LoginDto, RegisterDto } from './dto/';
//Models
import { User } from '../user/models/';
//Logger
import { logger } from '../app.logger';

class AuthController {
	constructor(
        private readonly userModel: typeof User,
	) { }

	private createToken(body): string {
		return jwt.sign(
			body,
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN }
		);
	}

    @Bind
	public async login(req: Request, res: Response) {
		if (req.user) {
			const jwt = this.createToken(req.user);
			return res.send(jwt);
		}
		try {
			const { email, password } = req.body as LoginDto;

			const candidate = await this.userModel.findOne({ where: { email } });

			if (!candidate) {
				return res.status(400).send({ message: 'The user is not found' });
			}

			const isMatch = await bcrypt.compare(password, candidate.password);

			if (!isMatch)
				return res.status(400).json({ message: 'invalid password' });

			const jwt = this.createToken(candidate.get());

			res.send(jwt);
		} catch (ex) {
			logger.error(ex.message);
			res.status(500).send(ex);
		}
	}
    @Bind
    public async register(req: Request, res: Response) {
    	try {
    		const { email, name, password } = req.body as RegisterDto;

    		const candidate = await this.userModel.findOne({ where: { email } });

    		if (candidate) {
    			return res.status(400).send({ message: 'The user is already registered' });
    		}

    		const hashedPassword = await bcrypt.hash(password, 12);

    		const user = await this.userModel.create({ email, name, password: hashedPassword });

    		const jwt = this.createToken(user.get());

    		res.send(jwt);
    	} catch (ex) {
    		logger.error(ex.message);
    		res.status(500).send(ex);
    	}
    }
}
export default new AuthController(User);