import * as UsersController from "./UserController";
import validateParams from '../../middleware/validateParams';

export default [
    {
        path: "/users",
        method: "get",
        handler: UsersController.getAllUsers
    },
    {
        path: "/user/:id",
        method: "get",
        handler: [
            validateParams({
                properties: {
                    id: { type: 'number' }
                },
                required: ['id']
            }),
            UsersController.getUserById
        ]
    },
    {
        path: "/user",
        method: "post",
        handler: [
            validateParams({
                properties: {
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                    passwordConfirm: { type: 'string', minLength: 1, maxLength: 255 }
                },
                required: ['email', 'password', 'passwordConfirm']
            }),
            UsersController.createUser
        ]
    }
];