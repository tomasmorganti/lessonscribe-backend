exports.up = function (knex) {
    return knex.schema.createTable('instructors', (table) => {
        table.increments().primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('name');
        table.string('contact_email').notNullable();
        table.string('phone');
        table.timestamps();
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('instructors');
    }
};
