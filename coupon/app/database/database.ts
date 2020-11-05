import { Sequelize } from 'sequelize-typescript';
//Models
import { Coupon } from '../coupon/models';
import { User } from '../user/models';

export const sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    models: [Coupon, User],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});