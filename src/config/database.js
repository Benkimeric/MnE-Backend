const env = require("./environment.js");

const defaultConfig = {
  databaseUrl: env.DATABASE_URL,
  dialect: env.DATABASE_DIALECT || "postgress",
  use_env_variable: "DATABASE_URL",
  dialectOptions: {
    useUTC: false, // for reading from database
  },
  timezone: "+03:00",
};

const database = {
  development: {
    ...defaultConfig,
  },
  staging: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = database;
