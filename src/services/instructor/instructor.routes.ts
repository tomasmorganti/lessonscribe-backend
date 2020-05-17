import { Request, Response } from 'express';
import * as InstructorService from './instructor.service';
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
                anyOf: [{ required: ['name'] }, { required: ['email'] }, { required: ['phone'] }],
            }),
            async (req: Request, res: Response) => {
                const { instructorId } = req.user;

                const { name, email: contact_email, phone } = req.body;

                const updatedInstructor = await InstructorService.updateInstructorInfo(instructorId, {
                    name,
                    contact_email,
                    phone,
                });

                res.status(200).send(updatedInstructor);
            },
        ],
    },
];
