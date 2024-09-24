/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.string("id").primary();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("role").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("clients", function (table) {
      table.string("id").primary();
      table.boolean("isDeleted").notNullable();

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.foreign("id").references("users.id");
    })
    .createTable("hosts", function (table) {
      table.string("id").primary();
      table.jsonb("workHours").notNullable();
      table.jsonb("workDays").notNullable();
      table.string("forwardBooking").notNullable();
      table.boolean("isDeleted").notNullable();

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.foreign("id").references("users.id");
    })
    .createTable("bookings", function (table) {
      table.string("id").primary();
      table.string("clientId").notNullable();
      table.string("hostId").notNullable();
      table.date("date").notNullable();
      table.time("timeFrom").notNullable();
      table.time("timeTo").notNullable();
      table.boolean("isСanceled").notNullable();
      table.boolean("isDeleted").notNullable();

      table.foreign("clientId").references("clients.id");
      table.foreign("hostId").references("clients.id");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("clients")
    .dropTable("hosts")
    .dropTable("bookings");
};
