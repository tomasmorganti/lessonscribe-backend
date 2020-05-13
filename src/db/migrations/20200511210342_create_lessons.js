exports.up = function (knex) {
    return knex.schema.createTable('lessons', (table) => {
        table.uuid('id').primary();
        table.integer('instructor_id').unsigned().notNullable();
        table.integer('student_id').unsigned().notNullable();
        table
            .enu('status', ['scheduled', 'complete', 'canceled'], { useNative: true, enumName: 'lesson_status' })
            .notNullable()
            .defaultTo('scheduled');
        table.datetime('start_time').notNullable();
        table.datetime('end_time').notNullable();
        table.timestamps();
        table.foreign('instructor_id').references('id').inTable('instructors');
        table.foreign('student_id').references('id').inTable('students');
    });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('lessons');
    }
};
