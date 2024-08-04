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
      table.foreign("id").references("users.id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("hosts", function (table) {
      table.string("id").primary();
      table.jsonb("workHours").notNullable();
      table.jsonb("workDays").notNullable();
      table.string("forwardBooking").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.foreign("id").references("users.id");
    })
    .createTable("bookings", function (table) {
      table.string("id").primary();
      table.string("clientId").notNullable();
      table.string("hostId").notNullable();
      table.string("date").notNullable();
      table.jsonb("time").notNullable();

      table.foreign("clientId").references("clients.id");
      table.foreign("hostId").references("clients.id");
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
