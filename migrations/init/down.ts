import { Ignite } from "../../ignite";

const up = async () => {
  await Ignite.init();
  await Ignite.query(`
    drop table \`users\`;
  `);

  await Ignite.query(`
    drop table \`clients\`;
  `);

  await Ignite.query(`
    drop table \`hosts\`;
  `);

  await Ignite.query(`
    drop table \`bookings\`;
  `);

  Ignite.disconnect();
};

up();
