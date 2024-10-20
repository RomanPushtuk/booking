import { ODBC } from "../../ignite";

const up = async () => {
  await ODBC.init();
  const connection = ODBC.getConnection();
  connection.query(`
    create table \`users\` (
    \`id\` varchar(255),
    \`email\` varchar(255) not null,
    \`password\` varchar(255) not null,
    \`role\` varchar(255) not null,
    \`created_at\` timestamp not null,
    \`updated_at\` timestamp not null,
    primary key (\`id\`)
    );

    UPDATE \`users\` SET \`created_at\` = CURRENT_TIMESTAMP;
    UPDATE \`users\` SET \`updated_at\` = CURRENT_TIMESTAMP;

    create table \`clients\` (
    \`id\` varchar(255),
    \`isDeleted\` boolean not null,
    \`created_at\` timestamp not null,
    \`updated_at\` timestamp not null,
    primary key (\`id\`)
    );

    UPDATE \`clients\` SET \`created_at\` = CURRENT_TIMESTAMP;
    UPDATE \`clients\` SET \`updated_at\` = CURRENT_TIMESTAMP;

    create table \`hosts\` (
    \`id\` varchar(255),
    \`workHours\` varchar not null,
    \`workDays\` varchar not null,
    \`forwardBooking\` varchar(255) not null,
    \`isDeleted\` boolean not null,
    \`created_at\` timestamp not null,
    \`updated_at\` timestamp not null,
    primary key (\`id\`)
    );

    UPDATE \`hosts\` SET \`created_at\` = CURRENT_TIMESTAMP;
    UPDATE \`hosts\` SET \`updated_at\` = CURRENT_TIMESTAMP;

    create table \`bookings\` (
    \`id\` varchar(255),
    \`clientId\` varchar(255) not null,
    \`hostId\` varchar(255) not null,
    \`date\` date not null,
    \`timeFrom\` time not null,
    \`timeTo\` time not null,
    \`isСanceled\` boolean not null,
    \`isDeleted\` boolean not null,
    \`created_at\` timestamp not null,
    \`updated_at\` timestamp not null,
    primary key (\`id\`)
    );

    UPDATE \`bookings\` SET \`created_at\` = CURRENT_TIMESTAMP;
    UPDATE \`bookings\` SET \`updated_at\` = CURRENT_TIMESTAMP;
`);

  ODBC.returnConnection(connection);
  ODBC.close();
};

up();
