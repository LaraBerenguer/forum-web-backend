import { sequelize } from "./database/database";
import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';

const startServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 4000;

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRouter);

    app.get('/health', (_req: Request, res: Response) => {
        res.json({ status: 'API running' });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    
    //db connection
    try {
        await sequelize.authenticate();
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection failed", error)
    }
};

export default startServer;