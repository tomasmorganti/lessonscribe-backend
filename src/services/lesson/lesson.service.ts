import Lesson from './lesson.model';
import { getInstructorByUserId } from '../instructor/instructor.service';
import { v4 as uuidv4 } from 'uuid';
import { HTTP400Error } from '../../utils/httpErrors';

type LessonData = {
    instructorId: number;
    studentId: number;
    status?: string;
    startDatetime: Date;
    endDatetime: Date;
};

export const createLesson = async (lessonData: LessonData) => {
    const newLesson = { id: uuidv4(), ...lessonData };

    const createdLesson = await Lesson.query().insert(newLesson).returning('*');

    return createdLesson;
};

export const updateLesson = async (id: any, lessonData: LessonData) => {
    const lesson = await Lesson.query().findOne({
        id,
        instructorId: lessonData.instructorId
    });
    if (!lesson) {
        throw new HTTP400Error('Lesson not found');
    };
    const updatedLessonArray = await Lesson.query().patch(lessonData).where('id', id).returning('*');
    return updatedLessonArray[0];
};
