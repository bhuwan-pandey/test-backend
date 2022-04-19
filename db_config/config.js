const { Sequelize } = require("sequelize");

const config = {
  host: "localhost",
  username: "root",
  password: "password",
  database: "sample_test",
  port: 3306,
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "+05:45",
  },
  timezone: "+05:45", //for writing tzo database
  // operatorsAliases: false,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = sequelize;
