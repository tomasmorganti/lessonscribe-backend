exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments().primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.enu('role', ['admin', 'user'], { useNative: true, enumName: 'user_role' }).notNullable();
        table.boolean('active').defaultTo(1);
        table.timestamps();
    });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('users');
    }
};
