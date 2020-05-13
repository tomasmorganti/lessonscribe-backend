exports.up = function (knex) {
    return knex.schema.createTable('students', (table) => {
        table.increments().primary();
        table.integer('instructor_id').unsigned().notNullable();
        table.string('name').notNullable();
        table.string('contact_email');
        table.string('phone');
        table.enu('level', ['beginner', 'intermediate', 'advanced'], { useNative: true, enumName: 'student_level' });
        table.boolean('active').defaultTo(1);
        table.timestamps();
        table.foreign('instructor_id').references('id').inTable('instructors');
    });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('students');
    }
};
