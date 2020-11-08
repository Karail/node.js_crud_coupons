require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
// Routes
import couponRouter from './coupon/coupon.route';
import authRouter from './auth/auth.route';
//Connect database
import { sequelize } from './database/database';
//Passport
import passport from './auth/middleware/passport.middleware';
//Logger
import { logger } from './app.logger';

const app = express();
//Morgan
app.use(morgan('dev', { stream: logger.stream.write }));
// Helpers:
app.use(helmet());
app.use(
    cors({
        origin: (_, cb) => cb(null, true),
        credentials: true,
        preflightContinue: true,
        exposedHeaders: [
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept',
            'X-Password-Expired',
        ],
        optionsSuccessStatus: 200,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Passport:
app.use(passport.initialize());
//Swagger:
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc({
    swaggerDefinition: {
        info: {
            version: '1.0',
            title: 'Coupons API',
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
            oauth: {
                type: 'oauth2',
                authorizationUrl: `http://${process.env.HOST}:${process.env.PORT}/auth/auth0/login/`,
            }
        }
    },
    basePath: __dirname,
    apis: [`${__dirname}/coupon/*.ts`, `${__dirname}/auth/*.ts`]
})));
//Routes:
app.use('/coupon', couponRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT, async () => {
    try {
        await sequelize.sync({ force: true });
        logger.info("Drop and re-sync db.");
        logger.info(`run serve ${process.env.PORT}`);
    } catch (ex) {
        logger.error(ex.message);
        process.exit(1);
    }
});
export default app;