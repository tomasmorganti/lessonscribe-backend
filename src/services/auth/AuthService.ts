import * as jwt from 'jsonwebtoken'

export const generateToken = (id: number) => {
    const secret = 'MySuP3R_z3kr3t';
    const expiration = '7d';

    return jwt.sign({ id }, secret, { expiresIn: expiration });
};