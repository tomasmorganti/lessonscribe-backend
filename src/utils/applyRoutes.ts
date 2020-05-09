import { Router, Request, Response, NextFunction } from 'express';
import verifyJwt from '../middleware/verifyJwt';

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

type Route = {
    path: string;
    method: string;
    checkAuth: boolean;
    handler: Handler[];
};

export default (routes: Route[], router: Router) => {
    for (const route of routes) {
        const { method, checkAuth, path } = route;
        let { handler } = route;
        if (checkAuth) {
            handler = [verifyJwt, ...handler]
        }
        (router as any)[method](path, handler);
    }
};
