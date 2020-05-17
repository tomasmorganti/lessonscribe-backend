import Student from './student.model';
import { getInstructorByUserId } from '../instructor/instructor.service';
import { HTTP401Error, HTTP400Error } from '../../utils/httpErrors';

type NewStudentData = {
    instructorId: number;
    name: string;
    email?: string;
    phone?: string;
    level?: string;
};

export const createStudent = async (studentData: NewStudentData) => {
    const createdStudent = await Student.query().insert(studentData).returning('*');
    return createdStudent;
};
