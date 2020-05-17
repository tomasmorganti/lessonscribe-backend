import { Request, Response } from 'express';
import * as StudentService from './student.service';
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
                    name: { type: 'string', minLength: 1, maxLength: 255 },
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    phone: { type: 'string', minLength: 1, maxLength: 50 },
                    level: { enum: ['beginner', 'intermediate', 'advanced'] },
                },
                required: ['name'],
            }),
            async (req: Request, res: Response) => {
                const instructor_id = req.user.instructorId;

                const { name, email: contact_email, phone, level } = req.body;

                const newStudent = await StudentService.createStudent({
                    instructor_id,
                    name,
                    contact_email,
                    phone,
                    level,
                });

                res.status(200).send(newStudent);
            },
        ],
    },
    {
        path: '/student/:id',
        method: 'patch',
        handler: [
            checkAuth,
            validateParams({
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string', minLength: 1, maxLength: 255 },
                    email: { type: 'string', minLength: 1, maxLength: 255 },
                    phone: { type: 'string', minLength: 1, maxLength: 50 },
                    level: { enum: ['beginner', 'intermediate', 'advanced'] },
                    active: { type: 'boolean' },
                },
                anyOf: [
                    { required: ['name'] },
                    { required: ['email'] },
                    { required: ['phone'] },
                    { required: ['level'] },
                    { required: ['active'] },
                ],
            }),
            async (req: Request, res: Response) => {
                const instructor_id = req.user.instructorId;
                res.status(200).send('update student');
            },
        ],
    },
];
