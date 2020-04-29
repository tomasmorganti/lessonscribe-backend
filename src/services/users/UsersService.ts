import Users from "../../db/models/Users";

export const getAllUsers = async () => {
    const users = await Users.query().select();
    return users;
};

export const getUserById = async (id: any) => {
    return await Users.query().findById(id);
};