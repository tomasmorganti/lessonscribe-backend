const argon2 = require('argon2');

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(async function () {
            const adminPassword = await argon2.hash('admin123');
            const userPassword = await argon2.hash('user123');
            // Inserts seed entries
            return knex('users').insert([
                {
                    email: 'admin@schleem.com',
                    password: adminPassword,
                    role: 'admin',
                },
                {
                    email: 'user@schleem.com',
                    password: userPassword,
                    role: 'user',
                }
            ]);
        });
};
