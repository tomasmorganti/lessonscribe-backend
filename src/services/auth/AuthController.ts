import { Request, Response } from 'express';
import { HTTP401Error } from '../../utils/httpErrors';
import * as AuthService from './AuthService';
import * as UserService from '../user/UserService';
import * as argon2 from 'argon2';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (!user) {
        throw new HTTP401Error('username or password incorrect.');
    } else {
        const correctPassword = await argon2.verify(user.password, password);
        if (!correctPassword) {
            throw new HTTP401Error('username or password incorrect.');
        }
    }

    const token = AuthService.generateToken(user.id);

    res.status(200).send({
        token
    });
};