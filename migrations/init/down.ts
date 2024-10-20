import { ODBC } from "../../ignite";

const up = async () => {
  await ODBC.init();
  const connection = ODBC.getConnection();
  connection.query(`
    drop table \`users\`;

    drop table \`clients\`;

    drop table \`hosts\`;

    drop table \`bookings\`;
  `);

  ODBC.returnConnection(connection);
  ODBC.close();
};

up();
