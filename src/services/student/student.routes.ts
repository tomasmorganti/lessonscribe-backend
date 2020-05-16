import * as StudentController from './student.controller';
import validateParams from '../../middleware/validateParams';
import checkAuth from '../../middleware/checkAuth';

export default [
    {
        path: '/student',
        method: 'post',
        handler: [
            checkAuth,
            validateParams({
                properties: {
                    instructorId: { type: 'number' },
                    name: { type: 'string', minLength: 1, maxLength: 255 },
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    phone: { type: 'string', minLength: 1, maxLength: 50 },
                    level: { enum: ['beginner', 'intermediate', 'advanced'] },
                },
                required: ['instructorId', 'name'],
            }),
            StudentController.addNewStudent,
        ],
    },
];
