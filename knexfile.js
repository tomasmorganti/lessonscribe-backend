require("dotenv").config();

module.exports = {
  client: "pg",
  useNullAsDefault: true,
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./src/db/migrations"
  },
  seeds: {
    directory: "./src/db/seeds"
  }
};
