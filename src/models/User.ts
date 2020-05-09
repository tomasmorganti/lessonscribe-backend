import { Model } from 'objection';

export default class User extends Model {
    id!: number;
    email!: string;
    password!: string;
    created_at: any;
    updated_at: any;

    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            },
            required: ['email', 'password'],
        };
    }
}
