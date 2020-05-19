import Student from './student.model';
import { getInstructorByUserId } from '../instructor/instructor.service';
import { HTTP400Error } from '../../utils/httpErrors';

type StudentData = {
    instructorId: number;
    name?: string;
    email?: string;
    phone?: string;
    level?: string;
    active?: boolean;
};

export const createStudent = async (studentData: StudentData) => {
    const createdStudent = await Student.query().insert(studentData).returning('*');
    return createdStudent;
};

export const updateStudent = async (id: any, studentData: StudentData) => {
    const student = await Student.query().findOne({
        id,
        instructorId: studentData.instructorId
    });
    if (!student) {
        throw new HTTP400Error('Student not found');
    }
    const updatedStudent = await Student.query().patch(studentData).where('id', id).returning('*');
    return updatedStudent[0];
};