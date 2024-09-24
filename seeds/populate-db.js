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
      isDeleted: false,
    },
    {
      id: "i26ZY62r",
      isDeleted: false,
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
      isDeleted: false,
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
      isDeleted: false,
    },
  ]);

  await knex("bookings").insert([
    {
      id: "3Pi6mKX5",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-22",
      timeFrom: "09:00",
      timeTo: "10:00",
      isСanceled: false,
      isDeleted: false,
    },
    {
      id: "1z5v5ZdF",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-22",
      timeFrom: "12:00",
      timeTo: "13:00",
      isСanceled: false,
      isDeleted: false,
    },
    {
      id: "1z5v5ZdZ",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-24",
      timeFrom: "08:00",
      timeTo: "19:00",
      isСanceled: false,
      isDeleted: false,
    },
    {
      id: "225v5ZdZ",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-25",
      timeFrom: "07:00",
      timeTo: "09:00",
      isСanceled: false,
      isDeleted: false,
    },
    {
      id: "224v5ZdZ",
      clientId: "aQKUaHTJ",
      hostId: "Y9oWsNNc",
      date: "2024-09-27",
      timeFrom: "16:00",
      timeTo: "19:00",
      isСanceled: false,
      isDeleted: false,
    },
  ]);
};
