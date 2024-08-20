import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER ? Number(process.env.PORT_NUMBER) : 5432, 
});

export default async function dbConnect() {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT NOW()");
      console.log("Query executed Successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in query execution", err.stack);
    } else {
      console.error("Unknown error", err);
    }
  } finally {
    client.release();
  }
}
