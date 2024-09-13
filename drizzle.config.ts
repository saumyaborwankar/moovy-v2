import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DB_URL!,
    password: process.env.DB_PASSWORD!,
    user: process.env.DB_USERNAME!,
    host: process.env.DB_URL!,
    database: process.env.DB_NAME!,
    ssl: {
      rejectUnauthorized: false, // Set to true if you have a valid SSL certificate
    },
    port: parseInt(process.env.DB_PORT!),
  },
  verbose: true,
  // strict: true,
});
