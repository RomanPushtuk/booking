import odbc from "odbc";

const boosttrap = async () => {
  const connectionString =
    "Driver={Apache Ignite};Address=127.0.0.1:10800;Schema=PUBLIC;PageSize=1000;";

  const connection = await odbc.connect(connectionString);
  const data = await connection.query("SELECT now()");
  console.log(data);
};

boosttrap()
