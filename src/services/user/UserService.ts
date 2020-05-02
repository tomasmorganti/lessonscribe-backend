import User from "../../models/User";

type NewUser = {
    email: string;
    password: string;
};

export const createUser = async (newUser: NewUser) => {
    return await User.query().insert(newUser).returning("*");
};

export const getAllUsers = async () => {
    return await User.query().select("*");
};

export const getUserById = async (id: string) => {
    return await User.query().findById(id);
};