import { Model } from 'objection';

export default class User extends Model {
    email!: string;
    password!: string;

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
