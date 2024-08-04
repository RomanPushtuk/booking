import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
  debug: true,
  acquireConnectionTimeout: 10000,
});

export { db };
