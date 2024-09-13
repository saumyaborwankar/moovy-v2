import pg from "pg";

import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// import { drizzle } from 'drizzle-orm/aws-data-api/pg';
// import { RDSDataClient } from '@aws-sdk/client-rds-data';
// import { fromIni } from '@aws-sdk/credential-providers';
// const rdsClient = new RDSDataClient({
//     credentials: fromIni({ profile: process.env['PROFILE'] }),
//     region: 'ap-south-1',
// });
// const db = drizzle(rdsClient, {
//   database: process.env['DATABASE']!,
//   secretArn: process.env['SECRET_ARN']!,
//   resourceArn: process.env['RESOURCE_ARN']!,
// });

const pool = new pg.Pool({
  ssl: {
    rejectUnauthorized: false, // Set to true if you have a valid SSL certificate
  },
  password: process.env.DB_PASSWORD!,
  user: process.env.DB_USERNAME!,
  host: process.env.DB_URL!,
  database: process.env.DB_NAME!,
  port: parseInt(process.env.DB_PORT!),
  // connectionString: process.env.DB_URL,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

export default db;
