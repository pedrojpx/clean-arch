import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false, //don't automatically add createdAt and updatedAt columns
})
export default class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare rewardPoints: number;

    @Column({allowNull: false})
    declare streetNumber: number;

    @Column({allowNull: true})
    declare street: string;

    @Column({allowNull: false})
    declare zip: string;

    @Column({allowNull: false})
    declare city: string;

    @Column({allowNull: false})
    declare active: boolean;
}