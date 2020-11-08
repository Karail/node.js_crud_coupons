import { Router } from 'express';
//Controllers
import authController from './auth.controller';
//Middleware
import passport from '../auth/middleware/passport.middleware';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *  post:  
 *    description: login
 *    parameters:
 *      - in: formData
 *        name: email
 *        type: string
 *        required: true
 *        description: user email
 *      - in: formData
 *        name: password
 *        type: string
 *        required: true
 *        description: user password
 *    responses:
 *      '200':
 *        description: A successful login
 *      '400':
 *        description: The user is not found | invalid password
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/register:
 *  post:  
 *    description: register
 *    parameters:
 *      - in: formData
 *        name: email
 *        type: string
 *        required: true
 *        description: user email
 *      - in: formData
 *        name: password
 *        type: string
 *        required: true
 *        description: user password
 *      - in: formData
 *        name: name
 *        type: string
 *        required: true
 *        description: user name
 *    responses:
 *      '200':
 *        description: A successful register
 *      '400':
 *        description: The user is already registered
 */
router.post('/register', authController.register);

router.get('/auth0/login', passport.authenticate('auth0', { session: false }));

router.get('/auth0/callback', passport.authenticate('auth0', { session: false, failureRedirect: '/' }), authController.login);

export default router;