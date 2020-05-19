const Sequelize = require("sequelize");
const env = require("../helpers/AccessEnv");

const sequelize = new Sequelize(
  env.accessEnv("MYSQL_DATABASE_NAME"),
  env.accessEnv("MYSQL_USER_ROOT"),
  env.accessEnv("MYSQL_ROOT_PASSWORD"),
  {
    host: env.accessEnv("MYSQL_HOST"),
    dialect: "mysql",
    operatorsAliases: false,
  }
);
module.exports = sequelize;
