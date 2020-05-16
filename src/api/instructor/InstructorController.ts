import { Request, Response } from 'express';
import * as InstructorService from '../../services/InstructorService';

export const updateInstructorInfo = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id;

    const { name, email: contact_email, phone } = req.body;

    const updatedInstructor = await InstructorService.updateInstructorInfo(userId, { name, contact_email, phone });

    res.status(200).send(updatedInstructor);
};
