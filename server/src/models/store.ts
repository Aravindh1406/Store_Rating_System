import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Store extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public address!: string;
  public ownerId!: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Store.init(
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
    },

    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "stores",
    timestamps: true,
  }
);

export default Store;