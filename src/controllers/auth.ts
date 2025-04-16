import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, verifyToken } from "../services/authServices";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const logUser = async (req: Request, res: Response) => {
    try {
        const access_token = await loginUser(req.body);
        res.status(200).json({ access_token });
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = await verifyToken(req.headers.authorization);
        req.user_id = user_id;
        next();
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};