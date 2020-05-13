import { Model } from 'objection';

export default class Student extends Model {
    readonly id!: number;
    instructor_id!: number;
    name!: string;
    contact_email?: string;
    level?: string;
    active!: boolean;
    created_at: any;
    updated_at: any;

    static get tableName() {
        return 'students';
    }

    static get relationMappings() {
        return {
            instructor: {
                relation: Model.BelongsToOneRelation,
                modelClass: './Instructor.ts',
                join: {
                    from: 'students.instructor_id',
                    to: 'instructors.id',
                },
            },
            lessons: {
                relation: Model.HasManyRelation,
                modelClass: './Lesson.ts',
                join: {
                    from: 'students.id',
                    to: 'lessons.student_id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1, maxLength: 255 },
                contact_email: { type: 'string', minLength: 1, maxLength: 255 },
                level: { enum: ['beginner', 'intermediate', 'advanced'] },
            },
        };
    }
}
