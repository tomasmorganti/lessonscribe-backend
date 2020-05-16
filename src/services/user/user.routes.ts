import * as UserController from './user.controller';
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
            UserController.signupUser,
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
            UserController.addAdminUser,
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
            UserController.loginUser,
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
            UserController.loginAsUser,
        ],
    },
];
