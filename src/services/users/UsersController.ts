import { Request, Response } from "express";
import * as UsersService from "./UsersService";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await UsersService.getAllUsers();
    res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await UsersService.getUserById(req.params.id);
    if (!user) {
        res.status(404).send({ message: "User not found" });
    };
    res.status(200).send(user);
};