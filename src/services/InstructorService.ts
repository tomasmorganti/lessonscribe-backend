import Instructor from '../models/Instructor';
import { HTTP400Error } from '../utils/httpErrors';

type UpdateInstructorData = {
    name?: string;
    contact_email?: string;
    phone?: string;
};

export const getInstructorByUserId = async (id: number) => {
    const instructor = await Instructor.query().where('user_id', '=', id).returning('*');
    return instructor[0];
};

// TODO: should update this so that it can accept more than just userId and email.
export const createInstructor = async (userId: number, email: string) => {
    const instructor = await Instructor.query().insert({
        user_id: userId,
        contact_email: email,
    });
    return instructor;
};

export const updateInstructorInfo = async (userId: number, instructorData: UpdateInstructorData) => {
    const updatedInstructorArray = await Instructor.query()
        .patch(instructorData)
        .where('user_id', '=', userId)
        .returning('*');
    if (!updatedInstructorArray[0]) {
        throw new HTTP400Error('Instructor not found');
    }
    return updatedInstructorArray[0];
};
