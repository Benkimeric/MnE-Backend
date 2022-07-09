require("dotenv").config();

const databaseConfigs = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
};

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  ...databaseConfigs,
};

module.exports = env;
