import { Model } from 'objection';
import { v4 } from 'uuid/interfaces';

export default class Lesson extends Model {
    id!: v4;
    instructor_id!: number;
    student_id!: number;
    status!: string;
    start_datetime!: Date;
    end_datetime!: Date;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'lessons';
    }

    static get relationMappings() {
        return {
            instructor: {
                relation: Model.BelongsToOneRelation,
                modelClass: './Instructor.ts',
                join: {
                    from: 'lessons.instructor_id',
                    to: 'instructors.id',
                },
            },
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: './Student.ts',
                join: {
                    from: 'lessons.student_id',
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
                instructor_id: { type: 'number' },
                student_id: { type: 'number' },
                status: { enum: ['scheduled', 'rescheduled', 'completed', 'canceled'] },
                start_datetime: { type: 'string', format: 'date-time' },
                end_datetime: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'instructor_id', 'student_id', 'start_datetime', 'end_datetime'],
        };
    }
}
