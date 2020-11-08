import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	modelName: 'coupon'
})
export class Coupon extends Model<Coupon> {

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
    feedId: string;

    @Column({
    	allowNull: false,
    	type: DataType.STRING,
    })
    name: string;

    @Column({
    	allowNull: false,
    	type: DataType.STRING,
    })
    icon: string;

    @Column({
    	allowNull: false,
    	type: DataType.STRING,
    })
    iconFileName
}