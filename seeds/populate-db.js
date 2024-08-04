/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing data from tables
  await knex("users").del();
  await knex("clients").del();
  await knex("hosts").del();
  await knex("bookings").del();

  // Populate tables
  await knex("users").insert([
    {
      id: "aQKUaHTJ",
      email: "client_first@gmail.com",
      password: "12345678A",
      role: "client",
    },
    {
      id: "i26ZY62r",
      email: "client_second@gmail.com",
      password: "12345678B",
      role: "client",
    },
    {
      id: "Y9oWsNNc",
      email: "host_first@gmail.com",
      password: "12345678A",
      role: "host",
    },
    {
      id: "7D9OxjZR",
      email: "host_second@gmail.com",
      password: "12345678B",
      role: "host",
    },
  ]);

  await knex("clients").insert([
    {
      id: "aQKUaHTJ",
    },
    {
      id: "i26ZY62r",
    },
  ]);

  await knex("hosts").insert([
    {
      id: "Y9oWsNNc",
      workHours: JSON.stringify([{ from: "9:00", to: "18:00" }]),
      workDays: JSON.stringify([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ]),
      forwardBooking: "1 week",
    },
    {
      id: "7D9OxjZR",
      workHours: JSON.stringify([{ from: "9:00", to: "18:00" }]),
      workDays: JSON.stringify([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ]),
      forwardBooking: "1 week",
    },
  ]);

  await knex("bookings").insert([
    {
      id: "3Pi6mKX5",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "05/08/2024",
      time: JSON.stringify([{ from: "9:00", to: "10:00" }]),
    },
    {
      id: "1z5v5ZdF",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "05/08/2024",
      time: JSON.stringify([{ from: "12:00", to: "13:00" }]),
    },
  ]);
};
