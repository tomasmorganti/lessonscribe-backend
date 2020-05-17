import Student from './student.model';
import { getInstructorByUserId } from '../instructor/instructor.service';
import { HTTP401Error, HTTP400Error } from '../../utils/httpErrors';

type NewStudentData = {
    instructor_id: number;
    name: string;
    contact_email?: string;
    phone?: string;
    level?: string;
};

export const createStudent = async (userId: number, studentData: NewStudentData) => {
    //TODO: auth middleware? or in Instructor service?
    const instructorByUserId = await getInstructorByUserId(userId);
    if (instructorByUserId.id !== studentData.instructor_id) {
        console.log(`Instructor ID in request does not match the requesting user's instructor ID.`);
        throw new HTTP401Error('Unauthorized');
    }
    const createdStudent = await Student.query().insert(studentData).returning('*');
    return createdStudent;
};
