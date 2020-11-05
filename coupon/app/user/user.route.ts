import { Router } from 'express';
//Controllers
import userController from './user.controller';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;