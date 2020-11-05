require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// Routes
import couponRouter from './coupon/coupon.route';
import userRouter from './user/user.route';
//Connect database
import { sequelize } from './database/database';
//Passport
import passport from './auth/middleware/passport.middleware';

const app = express();
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
//Routes:
app.use('/coupon', couponRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT || 8080, async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Drop and re-sync db.");
        console.log('run serve');
    } catch (ex) {
        console.log(ex);
        process.exit(1);
    }
});