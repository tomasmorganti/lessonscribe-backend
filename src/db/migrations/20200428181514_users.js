exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments().primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('users');
    }
};
