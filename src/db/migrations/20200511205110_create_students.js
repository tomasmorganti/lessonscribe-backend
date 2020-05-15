exports.up = function (knex) {
    return knex.schema
        .createTable('students', (table) => {
            table.increments().primary();
            table.integer('instructor_id').unsigned().notNullable();
            table.string('name').notNullable();
            table.string('contact_email');
            table.string('phone');
            table.enu('level', ['beginner', 'intermediate', 'advanced'], {
                useNative: true,
                enumName: 'student_level',
            });
            table.boolean('active').defaultTo(1);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.foreign('instructor_id').references('id').inTable('instructors');
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
  
          CREATE TRIGGER update_students_updated_at
          BEFORE UPDATE ON students
          FOR EACH ROW
          EXECUTE PROCEDURE update_modified_column();
        `);
        });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('students');
    }
};
