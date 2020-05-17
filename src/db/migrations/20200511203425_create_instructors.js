exports.up = function (knex) {
    return knex.schema
        .createTable('instructors', (table) => {
            table.increments().primary();
            table.integer('user_id').unsigned().notNullable();
            table.string('name');
            table.string('email').notNullable();
            table.string('phone');
            table.boolean('active').defaultTo(1);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.foreign('user_id').references('id').inTable('users');
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
  
          CREATE TRIGGER update_instructors_updated_at
          BEFORE UPDATE ON instructors
          FOR EACH ROW
          EXECUTE PROCEDURE update_modified_column();
        `);
        });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('instructors');
    }
};
