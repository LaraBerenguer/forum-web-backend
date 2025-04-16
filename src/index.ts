import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './controllers/auth';
import userRouter from './routes/users';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'API running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});