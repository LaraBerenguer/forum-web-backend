import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        port: parseInt(process.env.DB_PORT || "5432"),
        logging: console.log,
    }
);