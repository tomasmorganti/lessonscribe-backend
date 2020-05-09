import * as UsersController from './UserController';
import validateParams from '../../middleware/validateParams';

export default [
    {
        path: '/users',
        method: 'get',
        checkAuth: true,
        handler: [UsersController.getAllUsers],
    },
    {
        path: '/user',
        method: 'get',
        checkAuth: true,
        handler: [
            validateParams({
                properties: {
                    id: { type: 'number' },
                    email: { type: 'string' },
                },
                oneOf: [{ required: ['id'] }, { required: ['email'] }],
            }),
            UsersController.getUserByIdOrEmail,
        ],
    },
    {
        path: '/user',
        method: 'post',
        checkAuth: false,
        handler: [
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                    passwordConfirm: { type: 'string', minLength: 1, maxLength: 255 },
                },
                required: ['email', 'password', 'passwordConfirm'],
            }),
            UsersController.createUser,
        ],
    },
];
