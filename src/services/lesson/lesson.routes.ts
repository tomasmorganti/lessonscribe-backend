import { Request, Response } from 'express';
import * as LessonService from './lesson.service';
import validateParams from '../../middleware/validateParams';
import checkAuth from '../../middleware/checkAuth';

export default [
    {
        path: '/lesson',
        method: 'post',
        handler: [
            checkAuth,
            validateParams({
                properties: {
                    studentId: { type: 'number' },
                    status: { enum: ['scheduled', 'rescheduled', 'completed', 'canceled'] },
                    startDatetime: { type: 'string', format: 'date-time' },
                    endDatetime: { type: 'string', format: 'date-time' },
                },
                required: ['studentId', 'startDatetime', 'endDatetime'],
            }),
            async (req: Request, res: Response) => {
                const instructor_id = req.user.instructorId;

                const {
                    studentId: student_id,
                    status,
                    startDatetime: start_datetime,
                    endDatetime: end_datetime,
                } = req.body;

                const newLesson = await LessonService.createLesson({
                    instructor_id,
                    student_id,
                    status,
                    start_datetime,
                    end_datetime,
                });

                res.status(200).send(newLesson);
            },
        ],
    },
];
