import knex from "knex";
import { Model } from "objection";
// @ts-ignore
import knexConfig from "../../knexfile";

export default async () => {
    console.log("Starting database connection...");
    const db = knex(knexConfig);
    try {
        await db.raw("Select 1 + 1 as result");
        Model.knex(db);
    } catch (e) {
        console.log("Database connection failed. Error: " + e);
        process.exit(1);
    }
    console.log("Database connection looks good.");
    db.on("query", query => console.log("DB Query Ran: " + query.sql));
};