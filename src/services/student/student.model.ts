import { Model } from 'objection';

export default class Student extends Model {
    readonly id!: number;
    instructorId!: number;
    name!: string;
    email?: string;
    phone?: string;
    level?: string;
    active!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName() {
        return 'students';
    }

    static get relationMappings() {
        return {
            instructor: {
                relation: Model.BelongsToOneRelation,
                modelClass: './Instructor.ts',
                join: {
                    from: 'students.instructorId',
                    to: 'instructors.id',
                },
            },
            lessons: {
                relation: Model.HasManyRelation,
                modelClass: './Lesson.ts',
                join: {
                    from: 'students.id',
                    to: 'lessons.studentId',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                instructorId: { type: 'number' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                phone: { type: 'string', minLength: 1, maxLength: 50 },
                level: { enum: ['beginner', 'intermediate', 'advanced'] },
                active: { type: 'boolean' },
            },
            required: ['instructorId', 'name'],
        };
    }
}
