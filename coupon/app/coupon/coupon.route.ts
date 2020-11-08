import { Router } from 'express';
//Controllers
import couponController from './coupon.controller';
//Middleware
import passport from '../auth/middleware/passport.middleware';
import multer from '../shared/middleware/multer.middleware';

const router = Router();

/**
 * @swagger
 * /coupon:
 *  get:
 *    security:
 *     - bearerAuth: []      
 *    description: Find all coupons
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', passport.authenticate('jwt', { session: false }), couponController.findAll);

/**
 * @swagger
 * /coupon/{id}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: coupon id
 *    security:
 *     - bearerAuth: []      
 *    description: Find coupon by id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), couponController.findOne);

/**
 * @swagger
 * /coupon:
 *  post:  
 *    description: login
 *    parameters:
 *      - in: formData
 *        name: feedId
 *        type: string
 *        required: true
 *        description: coupon feedId
 *      - in: formData
 *        name: name
 *        type: string
 *        required: true
 *        description: coupon name
 *      - in: formData
 *        name: icon
 *        type: file
 *        required: true
 *        description: coupon icon
 *    security:
 *     - bearerAuth: []  
 *    responses:
 *      '200':
 *        description: A successful create
 */
router.post('/', passport.authenticate('jwt', { session: false }), multer.single('icon'), couponController.create);

/**
 * @swagger
 * /coupon/{id}:
 *  put:  
 *    description: login
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: coupon id
 *      - in: formData
 *        name: feedId
 *        type: string
 *        required: true
 *        description: coupon feedId
 *      - in: formData
 *        name: name
 *        type: string
 *        required: true
 *        description: coupon name
 *      - in: formData
 *        name: icon
 *        type: file
 *        required: true
 *        description: coupon icon
 *    security:
 *     - bearerAuth: []  
 *    responses:
 *      '200':
 *        description: A successful update
 *      '400':
 *        description: The coupon is not found
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), multer.single('icon'), couponController.update);

/**
 * @swagger
 * /coupon/{id}:
 *  delete:
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: coupon id
 *    security:
 *     - bearerAuth: []      
 *    description: Delete coupon by id
 *    responses:
 *      '200':
 *        description: A successful delete
 *      '400':
 *        description: The coupon is not found
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), couponController.delete);

export default router;