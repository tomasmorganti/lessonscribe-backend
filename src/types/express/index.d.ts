type JwtUser = {
    id: number;
    role: string;
    instructorId: number;
    iat: any;
    exp: any;
};

declare namespace Express {
    export interface Request {
        user: JwtUser;
    }
}
