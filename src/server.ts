import { sequelize } from "./database/database";

sequelize.authenticate()
    .then(() => console.log("DB connected"))
    .catch(err => console.error("DB connection failed", err));