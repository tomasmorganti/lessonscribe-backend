import validateParams from '../../middleware/validateParams';
import * as AuthController from './AuthController';

export default [
    {
        path: '/login',
        method: 'post',
        checkAuth: false,
        handler: [
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                },
                required: ['email', 'password'],
            }),
            AuthController.loginUser,
        ],
    },
]