import { Request, Response } from 'express';
import * as LessonService from './lesson.service';

export const addLesson = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.user.id;

    const {
        instructorId: instructor_id,
        studentId: student_id,
        status,
        startDatetime: start_datetime,
        endDatetime: end_datetime,
    } = req.body;

    const newLesson = await LessonService.createLesson(userId, {
        instructor_id,
        student_id,
        status,
        start_datetime,
        end_datetime,
    });

    res.status(200).send(newLesson);
};
