import { Request, Response, NextFunction, Router } from 'express';
import * as Errors from '../utils/Errors';

const handle401Error = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err.name === 'UnauthorizedError') {
            Errors.unauthorizedError();
        }
        next(err);
    });
};

const handle404Error = (router: Router) => {
    router.use((req: Request, res: Response) => {
        Errors.notFoundError();
    });
};

const handleClientError = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        Errors.clientError(err, res, next);
    });
};

const handleServerError = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        Errors.serverError(err, res, next);
    });
};

export default [handle401Error, handle404Error, handleClientError, handleServerError];
