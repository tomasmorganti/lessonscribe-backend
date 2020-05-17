import { Model } from 'objection';
import { v4 } from 'uuid/interfaces';

export default class Lesson extends Model {
    id!: v4;
    instructorId!: number;
    studentId!: number;
    status!: string;
    startDatetime!: Date;
    endDatetime!: Date;
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName() {
        return 'lessons';
    }

    static get relationMappings() {
        return {
            instructor: {
                relation: Model.BelongsToOneRelation,
                modelClass: './Instructor.ts',
                join: {
                    from: 'lessons.instructorId',
                    to: 'instructors.id',
                },
            },
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: './Student.ts',
                join: {
                    from: 'lessons.studentId',
                    to: 'students.id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                instructorId: { type: 'number' },
                studentId: { type: 'number' },
                status: { enum: ['scheduled', 'rescheduled', 'completed', 'canceled'] },
                startDatetime: { type: 'string', format: 'date-time' },
                endDatetime: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'instructorId', 'studentId', 'startDatetime', 'endDatetime'],
        };
    }
}
