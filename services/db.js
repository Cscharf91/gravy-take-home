import sqlite from "better-sqlite3";
import path from "path";
const database = new sqlite(path.resolve("take_home.db"), {
  fileMustExist: true,
});

const query = (sql, params) => {
  return database.prepare(sql).all(params);
};

const db = {
  query,
};

export default db;
