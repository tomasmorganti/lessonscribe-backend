exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments().primary();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.enu('role', ['admin', 'user'], { useNative: true, enumName: 'user_role' }).notNullable();
            table.boolean('active').defaultTo(1);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
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
  
          CREATE TRIGGER update_users_updated_at
          BEFORE UPDATE ON users
          FOR EACH ROW
          EXECUTE PROCEDURE update_modified_column();
        `);
        });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== 'production') {
        return knex.raw(`DROP TYPE IF EXISTS user_role CASCADE`).then(() => {
            return knex.schema.dropTableIfExists('users');
        });
    };
};
