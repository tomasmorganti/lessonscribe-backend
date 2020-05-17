import Lesson from './lesson.model';
import { getInstructorByUserId } from '../instructor/instructor.service';
import { v4 as uuidv4 } from 'uuid';

type NewLessonData = {
    instructorId: number;
    studentId: number;
    status?: string;
    startDatetime: Date;
    endDatetime: Date;
};

export const createLesson = async (lessonData: NewLessonData) => {
    const newLesson = { id: uuidv4(), ...lessonData };

    const createdLesson = await Lesson.query().insert(newLesson).returning('*');

    return createdLesson;
};
