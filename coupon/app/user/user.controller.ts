import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//Decorators
import { Bind } from '../shared/decorators/';
//Dto
import { UserDto } from './dto/user.dto';
//Models
import { User } from './models/';

class UserController {
    constructor(
        private readonly userModel: typeof User,
    ) { }

    private createToken(body) {
        return jwt.sign(
            body,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    }

    @Bind
    public async login(req: Request, res: Response) {
        try {
            const { name, password } = req.body as UserDto;

            const candidate = await this.userModel.findOne({ where: { name } });

            if (!candidate) {
                return res.status(400).send({ message: "The user is not found" });
            }

            const isMatch = await bcrypt.compare(password, candidate.password)

            if (!isMatch)
                return res.status(400).json({ message: 'invalid password' })

            const user = await this.userModel.create({ name, password });

            const jwt = this.createToken(user.get());

            res.json(jwt);
        } catch (ex) {
            console.log(ex);
            res.status(500).send(ex);
        }
    }
    @Bind
    public async register(req: Request, res: Response) {
        try {
            const { name, password } = req.body as UserDto;

            const candidate = await this.userModel.findOne({ where: { name } });

            if (candidate) {
                return res.status(400).send({ message: "The user is already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await this.userModel.create({ name, password: hashedPassword });

            const jwt = this.createToken(user.get());

            res.json(jwt);
        } catch (ex) {
            console.log(ex);
            res.status(500).send(ex);
        }
    }
}
export default new UserController(User);