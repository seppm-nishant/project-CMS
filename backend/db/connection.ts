import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const client = new Client({
  connectionString:"postgres://postgres:Nishant9115@localhost:5432/vahan",
});

export const db = drizzle(client);
