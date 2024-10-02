import knex from "knex";

const db = knex({ client: "sqlite3", debug: true });

export { db };
