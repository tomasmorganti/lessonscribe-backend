import { Request, Response } from 'express';
import * as StudentService from './student.service';

export const addNewStudent = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.user.id;

    const { instructorId: instructor_id, name, email: contact_email, phone, level } = req.body;

    const newStudent = await StudentService.createStudent(userId, {
        instructor_id,
        name,
        contact_email,
        phone,
        level,
    });

    res.status(200).send(newStudent);
};
