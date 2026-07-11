import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    STORE_OWNER = "STORE_OWNER",
}

class User extends Model {
    public id?: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public address!: string;
    public role!: UserRole;
    public isActive!: boolean;
    public lastLogin?: Date;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },


            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            address: {
                type: DataTypes.STRING(400),
                allowNull: false,
            },

            role: {
                type: DataTypes.ENUM("ADMIN", "USER", "STORE_OWNER"),
                allowNull: false,
                defaultValue: UserRole.USER,
            },

            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },

            lastLogin: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
  {
        sequelize,
        tableName: "users",
        timestamps: true,
    }
);

export default User;