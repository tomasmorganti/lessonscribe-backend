import User from '../../models/User';

export const createUser = async (email: string, password: string) => {
    return await User.query()
        .insert({
            email,
            password,
        })
        .returning('*');
};

export const getAllUsers = async () => {
    return await User.query().select('*');
};

export const getUserById = async (id: string) => {
    return await User.query().findById(id);
};

export const getUserByEmail = async (email: string) => {
    const userArray = await User.query().where('email', '=', email);
    return userArray[0];
};
