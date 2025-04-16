import { Request, Response } from 'express';

// get
export const getUser = (req: Request, res: Response) => {
    const { id } = req.params;

    res.status(200).json({
        id,
        username: 'usuario_mock',
        email: 'usuario@mock.com'
    });
};


//post
export const addUser = (req: Request, res: Response) => {
    //const { id } = req.body;
    const id = 1;

    res.status(200).json({
        id,
        username: 'usuario_mock',
        email: 'usuario@mock.com'
    });
};