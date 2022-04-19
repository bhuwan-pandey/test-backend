const Sequelize = require("sequelize");
const dbSequelizer = require("../db_config/config");

const User = dbSequelizer.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
  },
  { underscored: true, tableName: "user" }
);

module.exports = User;
