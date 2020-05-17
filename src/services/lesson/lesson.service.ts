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

export const createLesson = async (userId: number, lessonData: NewLessonData) => {
    //TODO: auth middleware? or in Instructor service?
    const instructorByUserId = await getInstructorByUserId(userId);
    if (instructorByUserId.id !== lessonData.instructor_id) {
        console.log(`Instructor ID in request does not match the requesting user's instructor ID.`);
        throw new HTTP401Error('Unauthorized');
    }

    const newLesson = { id: uuidv4(), ...lessonData };

    const createdLesson = await Lesson.query().insert(newLesson).returning('*');

    return createdLesson;
};
