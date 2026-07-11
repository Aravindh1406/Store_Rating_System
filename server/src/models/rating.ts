import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Rating extends Model {
  public id?: number;
  public rating!: number;
  public userId!: number;
  public storeId!: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ratings",
    timestamps: true,
  }
);

export default Rating;