import { Model } from 'objection';

export default class Instructor extends Model {
    readonly id!: number;
    userId!: number;
    name?: string;
    email?: string;
    phone?: string;
    active!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName() {
        return 'instructors';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: './User.ts',
                join: {
                    from: 'instructors.userId',
                    to: 'users.id',
                },
            },
            lessons: {
                relation: Model.HasManyRelation,
                modelClass: './Lesson.ts',
                join: {
                    from: 'instructors.id',
                    to: 'lessons.instructorId',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                userId: { type: 'number' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                phone: { type: 'string', minLength: 1, maxLength: 50 },
            },
            required: ['userId'],
        };
    }
}
