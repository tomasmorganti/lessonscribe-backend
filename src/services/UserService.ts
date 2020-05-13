import User from '../models/User';
import * as AuthService from './AuthService';
import { HTTP400Error, HTTP401Error } from '../utils/httpErrors';

// export const getUserById = async (id: string) => {
//     const user = await User.query().findById(id);
//     if (!user) {
//         throw new HTTP400Error('user not found.');
//     }
//     return user;
// };

export const getUserByEmail = async (email: string) => {
    const usersArray = await User.query().where('email', '=', email);
    return usersArray[0];
};

export const createUser = async (email: string, password: string, passwordConfirm: string, role: string) => {
    if (password !== passwordConfirm) {
        throw new HTTP400Error('passwords do not match!');
    }

    const userWithEmail = await getUserByEmail(email);
    if (userWithEmail) {
        throw new HTTP400Error('email in use');
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const createdUser = await User.query()
        .insert({
            email,
            password: hashedPassword,
            role,
        })
        .returning('*');
    return createdUser;
};

export const loginUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new HTTP401Error('username or password incorrect.');
    } else {
        const correctPassword = await AuthService.verifyPassword(user.password as string, password);
        if (!correctPassword) {
            throw new HTTP401Error('username or password incorrect.');
        }
    }
    const token = AuthService.generateTokenForUser(user.id, user.role);
    return token;
};

export const createAdminUser = async (email: string, password: string) => {
    const userWithEmail = await getUserByEmail(email);
    if (userWithEmail) {
        throw new HTTP400Error('email in use');
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const createdAdminUser = await User.query()
        .insert({
            email,
            password: hashedPassword,
            role: 'admin',
        })
        .returning('*');
    return createdAdminUser;
};
