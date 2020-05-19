import { Request, Response } from 'express';
import * as LessonService from './lesson.service';
import validateParams from '../../middleware/validateParams';
import checkAuth from '../../middleware/checkAuth';
import { v4 } from 'uuid/interfaces';

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
                const { instructorId } = req.user;

                const { studentId, status, startDatetime, endDatetime } = req.body;

                const newLesson = await LessonService.createLesson({
                    instructorId,
                    studentId,
                    status,
                    startDatetime,
                    endDatetime,
                });

                res.status(200).send(newLesson);
            },
        ],
    },
    {
        path: '/lesson/:id',
        method: 'patch',
        handler: [
            checkAuth,
            validateParams({
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    studentId: { type: 'number' },
                    status: { enum: ['scheduled', 'rescheduled', 'completed', 'canceled'] },
                    startDatetime: { type: 'string', format: 'date-time' },
                    endDatetime: { type: 'string', format: 'date-time' },
                },
                anyOf: [
                    { required: ['studentId'] },
                    { required: ['status'] },
                    { required: ['startDateTime'] },
                    { required: ['endDatetime'] },
                ],
            }),
            async (req: Request, res: Response) => {
                const { instructorId } = req.user;

                const lessonId = req.params.id;

                const { studentId, status, startDatetime, endDatetime } = req.body;

                const updatedLesson = await LessonService.updateLesson(lessonId, {
                    instructorId,
                    studentId,
                    status,
                    startDatetime,
                    endDatetime,
                });

                res.status(200).send(updatedLesson);
            },
        ],
    },
];
