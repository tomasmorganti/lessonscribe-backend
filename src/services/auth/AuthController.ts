import { Request, Response } from "express";

export const getAuth = ({ query }: Request, res: Response) => {
    res.send(`Hello from getAuth. You sent in schleem query of ${query.schleem}.`);
};