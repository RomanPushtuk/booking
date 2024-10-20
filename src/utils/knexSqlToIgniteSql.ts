import { Knex } from "knex";

export const knexSqlToIgniteSql = <T = unknown>(
  cb: (args: T) => Knex.SqlNative,
) => {
  return (args: T): { sql: string; parameters: (string | number)[] } => {
    const { sql, bindings } = cb(args);

    const parameters: Array<number | string> = bindings.map((item) => {
      if (typeof item === "number") {
        return Number(item);
      }

      if (typeof item === "string") {
        return String(item);
      }

      throw new Error("Unsupported binding type");
    });

    return { sql, parameters };
  };
};
