import { Request, Response } from 'express';
import * as UserService from './user.service';
import checkAuth from '../../middleware/checkAuth';
import checkRole from '../../middleware/checkRole';
import validateParams from '../../middleware/validateParams';

export default [
    {
        path: '/signup',
        method: 'post',
        handler: [
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                    passwordConfirm: { type: 'string', minLength: 1, maxLength: 255 },
                },
                required: ['email', 'password', 'passwordConfirm'],
            }),
            async (req: Request, res: Response) => {
                const { email, password, passwordConfirm } = req.body;

                const createdUser = await UserService.createUser(email, password, passwordConfirm, 'user');

                res.status(200).send({
                    id: createdUser.id,
                    email: createdUser.email,
                    createdAt: createdUser.createdAt,
                });
            },
        ],
    },
    {
        path: '/admin',
        method: 'post',
        handler: [
            checkAuth,
            checkRole('admin'),
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                    passwordConfirm: { type: 'string', minLength: 1, maxLength: 255 },
                },
                required: ['email', 'password', 'passwordConfirm'],
            }),
            async (req: Request, res: Response) => {
                const { email, password, passwordConfirm } = req.body;

                const createdUser = await UserService.createUser(email, password, passwordConfirm, 'admin');

                res.status(200).send({
                    id: createdUser.id,
                    email: createdUser.email,
                    createdAt: createdUser.createdAt,
                });
            },
        ],
    },
    {
        path: '/login',
        method: 'post',
        handler: [
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                },
                required: ['email', 'password'],
            }),
            async (req: Request, res: Response) => {
                const { email, password } = req.body;

                const user = await UserService.loginUser(email, password);

                res.status(200).send({
                    id: user.id,
                    token: user.token,
                });
            },
        ],
    },
    {
        path: '/login-as',
        method: 'post',
        handler: [
            checkAuth,
            checkRole('admin'),
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                },
                required: ['email'],
            }),
            async (req: Request, res: Response) => {
                const { email } = req.body;

                const user = await UserService.loginAsUser(email);

                res.status(200).send({
                    id: user.id,
                    token: user.token,
                });
            },
        ],
    },
];
