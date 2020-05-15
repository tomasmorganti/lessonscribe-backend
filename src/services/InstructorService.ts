import Instructor from '../models/Instructor';

// TODO: should update this so that it can accept more than just userId and email.
export const createInstructor = async (userId: number, email: string) => {
    const instructor = await Instructor.query().insert({
        user_id: userId,
        contact_email: email,
    });
    return instructor;
};
