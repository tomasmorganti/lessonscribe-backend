import { Model } from 'objection';

export default class Instructor extends Model {
    readonly id!: number;
    user_id!: number;
    name?: string;
    contact_email?: string;
    phone?: string;
    active!: boolean;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'instructors';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: './User.ts',
                join: {
                    from: 'instructors.user_id',
                    to: 'users.id',
                },
            },
            lessons: {
                relation: Model.HasManyRelation,
                modelClass: './Lesson.ts',
                join: {
                    from: 'instructors.id',
                    to: 'lessons.instructor_id',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                user_id: { type: 'number' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                contact_email: { type: 'string', minLength: 1, maxLength: 255 },
                phone: { type: 'string', minLength: 1, maxLength: 50 },
            },
            required: ['user_id'],
        };
    }
}
