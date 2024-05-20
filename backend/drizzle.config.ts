import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

const connectionString = process.env.DATABASE_URL as string;

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:"postgres://postgres:password@localhost:5432/vahan",
  },
} satisfies Config;
