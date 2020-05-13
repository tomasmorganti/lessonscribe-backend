import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

export const generateTokenForUser = (id: number, role: string) => {
    const secret = process.env.TOKEN_SECRET as string;
    const tokenExpirationTime = process.env.TOKEN_EXP;

    return jwt.sign({ id, role }, secret, { expiresIn: tokenExpirationTime });
};

export const hashPassword = (password: string) => {
    return argon2.hash(password);
};

export const verifyPassword = (hashedPassword: string, providedPassword: string) => {
    return argon2.verify(hashedPassword, providedPassword);
};
