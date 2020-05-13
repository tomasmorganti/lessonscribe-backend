import { Model } from 'objection';

export default class Lesson extends Model {
    id!: any;
    instructor_id!: number;
    student_id!: number;
    status!: string;
    start_time!: any;
    end_time!: any;
    created_at: any;
    updated_at: any;

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
                status: { enum: ['scheduled', 'complete', 'canceled'] },
            },
        };
    }
}
