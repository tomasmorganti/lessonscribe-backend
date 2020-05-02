import * as UsersController from "./UserController";

export default [
    {
        path: "/user",
        method: "get",
        handler: UsersController.getAllUsers
    },
    {
        path: "/user/:id",
        method: "get",
        handler: UsersController.getUserById
    },
    {
        path: "/user",
        method: "post",
        handler: UsersController.createUser
    }
];