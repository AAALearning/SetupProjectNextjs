import { Config, defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  schema: "./src/utils/drizzle/schema.ts",
  out: "./src/utils/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;
