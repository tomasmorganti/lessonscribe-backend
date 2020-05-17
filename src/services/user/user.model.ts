import { Model } from 'objection';

export default class User extends Model {
    readonly id!: number;
    email!: string;
    password!: string;
    role!: string;
    active!: boolean;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                role: { enum: ['admin', 'user'] },
            },
            required: ['email', 'password'],
        };
    }
}
