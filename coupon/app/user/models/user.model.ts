import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	modelName: 'user'
})
export class User extends Model<User> {

    @Column({
    	allowNull: false,
    	autoIncrement: true,
    	primaryKey: true,
    	type: DataType.INTEGER,
    })
    id: number;

    @Column({
    	allowNull: false,
    	type: DataType.STRING,
    })
    email: string;

    @Column({
    	allowNull: false,
    	type: DataType.STRING,
    })
    name: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING,
    })
    password: string;
}