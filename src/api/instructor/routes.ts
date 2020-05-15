import * as InstructorController from './InstructorController';
import checkAuth from '../../middleware/checkAuth';
import validateParams from '../../middleware/validateParams';

export default [
    {
        path: '/instructor',
        method: 'patch',
        handler: [
            checkAuth,
            validateParams({
                properties: {
                    name: { type: 'string', minLength: 1, maxLength: 255 },
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    phone: { type: 'string', minLength: 1, maxLength: 50 },
                },
                anyOf: [
                    { 'required': ['name'] },
                    { 'required': ["email"] },
                    { 'required': ["phone"] },
                ]
            }),
            InstructorController.updateInstructorInfo
        ]
    }
]