exports.up = function (knex) {
    return knex.schema
        .createTable('lessons', (table) => {
            table.uuid('id').primary();
            table.integer('instructor_id').unsigned().notNullable();
            table.integer('student_id').unsigned().notNullable();
            table
                .enu('status', ['scheduled', 'rescheduled', 'completed', 'canceled'], {
                    useNative: true,
                    enumName: 'lesson_status',
                })
                .notNullable()
                .defaultTo('scheduled');
            table.datetime('start_datetime').notNullable();
            table.datetime('end_datetime').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.foreign('instructor_id').references('id').inTable('instructors');
            table.foreign('student_id').references('id').inTable('students');
        })
        .then(() => {
            // We need to ensure the function exists, then add the table trigger
            return knex.raw(`
          CREATE OR REPLACE FUNCTION update_modified_column()
          RETURNS TRIGGER AS $$
          BEGIN
            NEW.updated_at = now();
            RETURN NEW;
          END;
          $$ language 'plpgsql';
  
          CREATE TRIGGER update_lessons_updated_at
          BEFORE UPDATE ON lessons
          FOR EACH ROW
          EXECUTE PROCEDURE update_modified_column();
        `);
        });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.raw(`DROP TYPE IF EXISTS lesson_status CASCADE`).then(() => {
            return knex.schema.dropTableIfExists('lessons');
        });
    }
};
