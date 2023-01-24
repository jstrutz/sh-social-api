import sqlite3 from "sqlite3";
import { open } from "sqlite";

const DEFAULT_DB_FILE = "tmp.sqlite3";

export async function buildSqliteClient({ DB_FILE }: { DB_FILE?: string }) {
  const db = await open({
    filename: DB_FILE || DEFAULT_DB_FILE,
    driver: sqlite3.cached.Database
  })
  await db.exec(
    `CREATE TABLE IF NOT EXISTS profiles (
      email TEXT NOT NULL PRIMARY KEY,
      clearbit_profile JSON NOT NULL,
      view_count INT DEFAULT 1
    );
    CREATE UNIQUE INDEX IF NOT EXISTS email_unique_idx ON profiles(email);
    CREATE INDEX IF NOT EXISTS view_count_idx ON profiles(view_count);
    `
  );
  return db;
}