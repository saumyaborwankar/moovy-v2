import pg from "pg";

import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// import { RDSDataClient } from '@aws-sdk/client-rds-data';
// import { fromIni } from '@aws-sdk/credential-providers';
// import { drizzle } from 'drizzle-orm/aws-data-api/pg';
// const rdsClient = new RDSDataClient({
//   credentials: fromIni({ profile: process.env['PROFILE'] }),
//   region: 'us-east-1',
// });
// const db = drizzle(rdsClient, {
//   database: process.env['DATABASE']!,
//   secretArn: process.env['SECRET_ARN']!,
//   resourceArn: process.env['RESOURCE_ARN']!,
// });

const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

export default db;
