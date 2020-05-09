import { Request, Response } from 'express';
import { HTTP400Error, HTTP401Error, HTTP404Error } from '../../utils/httpErrors';
import UserService from '../../services/user';
import * as argon2 from 'argon2';

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    res.status(200).send(users);
};

export const getUserByIdOrEmail = async (req: Request, res: Response) => {
    let user;

    if (req.query.id) {
        user = await UserService.getUserById(req.query.id as string);
    } else if (req.query.email) {
        user = await UserService.getUserByEmail(req.query.email as string);
    }

    if (!user) {
        throw new HTTP404Error('user not found!');
    }
    res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
        throw new HTTP400Error('passwords do not match!');
    }

    const userWithEmail = await UserService.getUserByEmail(email);
    if (userWithEmail) {
        throw new HTTP400Error('email in use');
    }

    const hashedPassword = await argon2.hash(password);

    const createdUser = await UserService.createUser(email, hashedPassword);
    res.status(200).send({
        id: createdUser.id,
        email: createdUser.email,
        createdAt: createdUser.created_at,
    });
};

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

    const token = UserService.generateTokenForUser(user.id);

    res.status(200).send({
        token
    });
};
