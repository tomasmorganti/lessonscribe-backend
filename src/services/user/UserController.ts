import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
    res.send("Hello from getUser")
};