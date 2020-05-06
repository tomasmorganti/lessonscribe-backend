import { Request, Response } from "express";
import { HTTP400Error, HTTP404Error } from "../../utils/httpErrors";
import * as UsersService from "./UserService";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UsersService.getAllUsers();
    res.status(200).send(users);
};

export const getUserByIdOrEmail = async (req: Request, res: Response) => {
    let user;

    if (req.query.id) {
        user = await UsersService.getUserById(req.query.id as string);
    } else {
        const usersArray = await UsersService.getUsersByEmail(req.query.email as string);
        user = usersArray[0];
    }

    if (!user) {
        throw new HTTP404Error("user not found!");
    };
    res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
        throw new HTTP400Error("passwords do not match!");
    };

    const usersWithEmail = await UsersService.getUsersByEmail(email);
    if (usersWithEmail[0]) {
        throw new HTTP400Error("email in use");
    };

    const createdUser = await UsersService.createUser({
        email,
        password
    });
    res.status(200).send(createdUser);
};