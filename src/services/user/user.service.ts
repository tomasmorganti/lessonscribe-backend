import User from './user.model';
import { createInstructor } from '../instructor/instructor.service';
import { HTTP400Error, HTTP401Error } from '../../utils/httpErrors';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

const generateTokenForUser = (id: number, role: string) => {
    const secret = process.env.TOKEN_SECRET as string;
    const tokenExpirationTime = process.env.TOKEN_EXP;

    return jwt.sign({ id, role }, secret, { expiresIn: tokenExpirationTime });
};

const hashPassword = (password: string) => {
    return argon2.hash(password);
};

const verifyPassword = (hashedPassword: string, providedPassword: string) => {
    return argon2.verify(hashedPassword, providedPassword);
};

const getUserByEmail = async (email: string) => {
    const usersArray = await User.query().where('email', '=', email);
    return usersArray[0];
};

export const createUser = async (email: string, password: string, passwordConfirm: string, role: string) => {
    if (password !== passwordConfirm) {
        throw new HTTP400Error('Passwords do not match');
    }

    const userWithEmail = await getUserByEmail(email);
    if (userWithEmail) {
        throw new HTTP400Error('Email in use');
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await User.query()
        .insert({
            email,
            password: hashedPassword,
            role,
        })
        .returning('*');

    if (role === 'user') {
        try {
            await createInstructor(createdUser.id, createdUser.email);
        } catch (e) {
            console.log('User created successfully. Error creating instructor: ', e);
        }
    }
    return createdUser;
};

export const loginUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new HTTP401Error('Username or password incorrect');
    } else {
        const correctPassword = await verifyPassword(user.password as string, password);
        if (!correctPassword) {
            throw new HTTP401Error('Username or password incorrect');
        }
    }
    const token = generateTokenForUser(user.id, user.role);
    return {
        id: user.id,
        token,
    };
};

export const loginAsUser = async (email: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new HTTP400Error('User not found');
    }
    const token = generateTokenForUser(user.id, user.role);
    return {
        id: user.id,
        token,
    };
};
