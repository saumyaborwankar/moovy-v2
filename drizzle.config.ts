import { defineConfig } from "drizzle-kit";

const localConfig = {
  url: process.env.DB_URL_LOCAL!,
};
const testConfig = {
  password: process.env.DB_PASSWORD!,
  user: process.env.DB_USERNAME!,
  host: process.env.DB_URL!,
  database: process.env.DB_NAME!,
  ssl: {
    rejectUnauthorized: false, // Set to true if you have a valid SSL certificate
  },
  port: parseInt(process.env.DB_PORT!),
};
const config =
  process.env.STAGE === "local"
    ? defineConfig({
        schema: "./lib/db/schema.ts",
        dialect: "postgresql",
        dbCredentials: localConfig,
        verbose: true,
      })
    : defineConfig({
        schema: "./lib/db/schema.ts",
        dialect: "postgresql",
        dbCredentials: testConfig,
        verbose: true,
      });

export default config;
