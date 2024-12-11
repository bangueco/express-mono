import dotenv from "dotenv";
import logger from "./logger";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const environment = process.env.NODE_ENV;
const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

if (!databaseUrl) {
  logger.error("DATABASE_URL environment variable is not defined!");
  throw new Error("DATABASE_URL environment variable is not defined!");
}

if (!environment) {
  logger.error("NODE_ENV environment variable is not defined!");
  throw new Error("NODE_ENV environment variable is not defined!");
}

if (!accessTokenKey) {
  logger.error("ACCESS_TOKEN_KEY environment variable is not defined!");
  throw new Error("ACCESS_TOKEN_KEY environment variable is not defined!");
}

if (!refreshTokenKey) {
  logger.error("REFRESH_TOKEN_KEY environment variable is not defined!");
  throw new Error("REFRESH_TOKEN_KEY environment variable is not defined!");
}

const config: {
  port: number
  databaseUrl: string
  environment: string
  accessTokenKey: string
  refreshTokenKey: string
} = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl,
  environment,
  accessTokenKey,
  refreshTokenKey
};

export default config;