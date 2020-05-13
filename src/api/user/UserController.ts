import { Request, Response } from 'express';
import * as UserService from '../../services/UserService';

export const signupUser = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;

    const createdUser = await UserService.createUser(email, password, passwordConfirm, 'user');

    res.status(201).send({
        id: createdUser.id,
        email: createdUser.email,
        createdAt: createdUser.created_at,
    });
};

export const addAdminUser = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;

    const createdUser = await UserService.createUser(email, password, passwordConfirm, 'admin');

    res.status(201).send({
        id: createdUser.id,
        email: createdUser.email,
        createdAt: createdUser.created_at,
    });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await UserService.loginUser(email, password);

    res.status(200).send({
        token
    });
};
