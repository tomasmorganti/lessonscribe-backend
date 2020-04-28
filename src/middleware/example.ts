import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const exampleMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.schleem) {
        throw new HTTP400Error("Missing schleem parameter");
    } else {
        next();
    }
};