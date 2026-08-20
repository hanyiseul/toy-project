import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
});

if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not configured. Database APIs will return a configuration error.",
  );
}

export const pool = process.env.DATABASE_URL
  ? mysql.createPool(process.env.DATABASE_URL)
  : null;

export async function query(sql, params = []) {
  if (!pool) throw new Error("DATABASE_URL is not configured");
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function checkDatabase() {
  if (!pool) return { configured: false, connected: false };
  await pool.query("SELECT 1");
  return { configured: true, connected: true };
}
