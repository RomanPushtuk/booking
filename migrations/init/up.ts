import { Ignite } from "../../ignite";

const up = async () => {
  await Ignite.init();
  await Ignite.query(`
    create table \`users\` (
    \`id\` varchar(255),
    \`email\` varchar(255) not null,
    \`password\` varchar(255) not null,
    \`role\` varchar(255) not null,
    primary key (\`id\`)
    );
  `);

  await Ignite.query(`
    create table \`clients\` (
    \`id\` varchar(255),
    \`isDeleted\` boolean not null,
    primary key (\`id\`)
    );
  `);

  await Ignite.query(`
    create table \`hosts\` (
    \`id\` varchar(255),
    \`workHours\` varchar not null,
    \`workDays\` varchar not null,
    \`forwardBooking\` varchar(255) not null,
    \`isDeleted\` boolean not null,
    primary key (\`id\`)
    );
  `);

  await Ignite.query(`
    create table \`bookings\` (
    \`id\` varchar(255),
    \`clientId\` varchar(255) not null,
    \`hostId\` varchar(255) not null,
    \`dateTimeFrom\` timestamp not null,
    \`dateTimeTo\` timestamp not null,
    \`isСanceled\` boolean not null,
    \`isDeleted\` boolean not null,
    primary key (\`id\`)
    );
  `);

  Ignite.disconnect();
};

up();
