exports.up = function (knex) {
    return knex.schema.createTable("users", table => {
        table.increments().primary();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
        table.timestamp("createdAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    if (process.env.NODE_ENV !== "production") {
        return knex.schema.dropTableIfExists("users");
    }
};
