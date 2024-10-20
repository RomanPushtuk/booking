import odbc from "odbc";

const connectionString =
  "Driver={Apache Ignite};Address=127.0.0.1:10800;Schema=PUBLIC;PageSize=1000;";
const poolParams = {
  connectionString, // The connection string to connect to the database
  connectionTimeout: 30, // The number of seconds to wait for a request on the connection to complete before returning to the application
  loginTimeout: 30, // The number of seconds to wait for a login request to complete before returning to the application
  initialSize: 10, //  The initial number of Connections created in the Pool
  incrementSize: 2, // How many additional Connections to create when all of the Pool's connections are taken
  reuseConnections: true, // Whether or not to reuse an existing Connection instead of creating a new one
  shrink: true, // Whether or not the number of Connections should shrink to `initialSize` as they free up
};

export class ODBC {
  private static _pool: odbc.Pool | null = null;
  private static _connections: odbc.Connection[] = [];

  public static async init(): Promise<void> {
    ODBC._pool = await odbc.pool(poolParams);

    for (let i = 0; i < 9; i++) {
      const connection = await ODBC._pool.connect();
      ODBC._connections.push(connection);
    }
  }

  public static getConnection(): odbc.Connection {
    const connection = ODBC._connections.shift();
    if (!connection) throw new Error("All connections was used");
    return connection;
  }

  public static returnConnection(connection: odbc.Connection): void {
    ODBC._connections.push(connection);
  }

  public static close() {
    this._pool?.close();
  }
}
