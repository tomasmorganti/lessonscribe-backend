import Instructor from '../models/Instructor';
import { HTTP400Error } from '../utils/httpErrors';

interface IUpdateInstructorData {
    name?: string;
    contact_email?: string;
    phone?: string;
};

// TODO: should update this so that it can accept more than just userId and email.
export const createInstructor = async (userId: number, email: string) => {
    const instructor = await Instructor.query().insert({
        user_id: userId,
        contact_email: email,
    });
    return instructor;
};

export const updateInstructorInfo = async (userId: number, data: IUpdateInstructorData) => {
    const updatedInstructorArray = await Instructor.query().patch(data).where('user_id', '=', userId).returning('*');
    if (!updatedInstructorArray[0]) {
        throw new HTTP400Error('Instructor not found');
    };
    return updatedInstructorArray[0];
};
