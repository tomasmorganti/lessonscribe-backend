import * as LessonController from './lesson.controller';
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
                    instructorId: { type: 'number' },
                    studentId: { type: 'number' },
                    status: { enum: ['scheduled', 'rescheduled', 'completed', 'canceled'] },
                    startDatetime: { type: 'string', format: 'date-time' },
                    endDatetime: { type: 'string', format: 'date-time' },
                },
                required: ['instructorId', 'studentId', 'startDatetime', 'endDatetime'],
            }),
            LessonController.addLesson,
        ],
    },
];
