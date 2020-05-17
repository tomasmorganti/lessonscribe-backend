import { Request, Response, NextFunction } from 'express';
import { HTTP401Error } from '../utils/httpErrors';

export default (roleRequired: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role !== roleRequired) {
            throw new HTTP401Error('Unauthorized');
        } else {
            next();
        }
    };
};
