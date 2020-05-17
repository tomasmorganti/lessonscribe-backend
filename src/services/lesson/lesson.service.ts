import Lesson from './lesson.model';
import { getInstructorByUserId } from '../instructor/instructor.service';
import { v4 as uuidv4 } from 'uuid';
import { HTTP401Error } from '../../utils/httpErrors';

type NewLessonData = {
    instructor_id: number;
    student_id: number;
    status?: string;
    start_datetime: Date;
    end_datetime: Date;
};

export const createLesson = async (lessonData: NewLessonData) => {
    const newLesson = { id: uuidv4(), ...lessonData };

    const createdLesson = await Lesson.query().insert(newLesson).returning('*');

    return createdLesson;
};
