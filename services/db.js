import sqlite from "better-sqlite3";
import path from "path";
const database = new sqlite(path.resolve("take_home.db"), {
  fileMustExist: true,
});

const query = (sql, params) => database.prepare(sql).all(params);
const run = (sql, params) => database.prepare(sql).run(params);

const db = {
  query,
  run,
};

export default db;
