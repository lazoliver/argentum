import { configDotenv } from "dotenv";

interface EnvVariables {
  api_port: string;
  release_mode: string;
  logfile: string | null;
  database_url: string;
}

const dotenv = configDotenv();

if (dotenv.error) {
  throw new Error("Couldn't find .env file");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const vars: EnvVariables = {
  api_port: process.env.API_PORT || "4001",
  release_mode: process.env.RELEASE_MODE || "dev",
  logfile: process.env.LOGFILE || null,
  database_url: process.env.DATABASE_URL,
};

export default vars;
