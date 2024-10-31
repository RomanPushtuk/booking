import {
  IgniteClient,
  CacheConfiguration,
  SqlFieldsQuery,
  IgniteClientConfiguration,
  CacheClient,
  SqlFieldsCursor,
} from "apache-ignite-client";
import { STATE } from "apache-ignite-client/dist/IgniteClient";

export class Ignite {
  private static _client: IgniteClient | null = null;
  private static _cache: CacheClient | null = null;

  public static async init() {
    const igniteClient = new IgniteClient(Ignite.onStateChanged);
    await igniteClient.connect(
      new IgniteClientConfiguration("127.0.0.1:10800"),
    );
    Ignite._client = igniteClient;

    const config = new CacheConfiguration();
    config.setSqlSchema("PUBLIC");

    const cache = await igniteClient.getOrCreateCache("t_TEST", config);
    Ignite._cache = cache;
  }

  public static async query(sql: string) {
    if (Ignite._cache) {
      const query = new SqlFieldsQuery(sql);
      query.setIncludeFieldNames(true);

      const cursor: SqlFieldsCursor = await Ignite._cache.query(query);
      const fieldNames = cursor.getFieldNames();
      const allRows = await cursor.getAll();

      const result: { [key: string]: any }[] = [];

      for (const row of allRows) {
        const obj: { [key: string]: any } = {};

        for (let i = 0; i < fieldNames.length; i++) {
          const field = fieldNames[i];
          const value = row[i] as any;
          obj[field] = value;
        }

        result.push(obj);
      }

      return result;
    }

    throw new Error("No Ignite._cache");
  }

  public static disconnect() {
    if (Ignite._client) {
      Ignite._client.disconnect();
      return;
    }

    throw new Error("No Ignite._client");
  }

  private static onStateChanged(state: STATE, reason: string) {
    if (state === IgniteClient.STATE.CONNECTED) {
      console.log("ApacheIgnite client is started");
    } else if (state === IgniteClient.STATE.DISCONNECTED) {
      console.log("ApacheIgnite client is stopped");
      if (reason) {
        console.log(reason);
      }
    }
  }
}
