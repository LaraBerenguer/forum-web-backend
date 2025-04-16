import { Router, Request, Response } from 'express';
const router = Router();

// mock signup
router.post('/signup', (req: Request, res: Response) => {
    const { username, email } = req.body;

    res.status(201).json({
        message: 'User registered successfully',
        data: { id: 1, username, email }
    });
});

//mock login
router.post('/login', (req: Request, res: Response) => {
    const { email } = req.body;

    res.status(200).json({
        message: 'Login successful',
        data: { id: 1, email, token: 'fake-jwt-token' }
    });
});

export default router;