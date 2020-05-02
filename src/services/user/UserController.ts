import { Request, Response } from "express";
import { HTTP400Error, HTTP404Error } from "../../utils/httpErrors";
import * as UsersService from "./UserService";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UsersService.getAllUsers();
    res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await UsersService.getUserById(req.params.id);
    if (!user) {
        throw new HTTP404Error("User not found!");
    };
    res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
        throw new HTTP400Error("Passwords do not match!");
    };
    const createdUser = await UsersService.createUser({
        email,
        password
    });
    res.status(200).send(createdUser);
};