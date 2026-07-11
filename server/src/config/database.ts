import { Sequelize } from "sequelize";
import { env } from "./env";

export const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: "mysql",
        logging: false
    }
);

export const connectDB = async () => {

    try {
        await sequelize.authenticate();
        console.log("Database Connected");
        await sequelize.sync();
        console.log("Database Synced");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }

}