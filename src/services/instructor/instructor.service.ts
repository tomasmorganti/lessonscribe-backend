import Instructor from './instructor.model';
import { HTTP400Error } from '../../utils/httpErrors';

type UpdateInstructorData = {
    name?: string;
    contact_email?: string;
    phone?: string;
};

export const getInstructorByUserId = async (id: number) => {
    const instructor = await Instructor.query().where('user_id', '=', id).returning('*');
    return instructor[0];
};

export const createInstructor = async (userId: number, email: string) => {
    const createdInstructor = await Instructor.query().insert({
        user_id: userId,
        contact_email: email,
    });
    return createdInstructor;
};

export const updateInstructorInfo = async (instructorId: number, data: UpdateInstructorData) => {
    const updatedInstructorArray = await Instructor.query().patch(data).where('id', instructorId).returning('*');
    if (!updatedInstructorArray[0]) {
        throw new HTTP400Error('Instructor not found');
    }
    return updatedInstructorArray[0];
};
