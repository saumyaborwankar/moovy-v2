import pg from "pg";

import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema>;
if (process.env.STAGE === "local") {
  const pool = new pg.Pool({
    connectionString: process.env.DB_URL_LOCAL,
  });
  db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
} else {
  const pool = new pg.Pool({
    ssl: {
      rejectUnauthorized: false, // Set to true if you have a valid SSL certificate
    },
    password: process.env.DB_PASSWORD!,
    user: process.env.DB_USERNAME!,
    host: process.env.DB_URL!,
    database: process.env.DB_NAME!,
    port: parseInt(process.env.DB_PORT!),
  });
  db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
}

export default db;
