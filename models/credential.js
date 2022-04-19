const Sequelize = require("sequelize");
const dbSequelizer = require("../db_config/config");
const bcrypt = require("bcrypt");

const Credential = dbSequelizer.define(
  "credential",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 12));
      },
    },
    role: {
      type: Sequelize.ENUM,
      values: ["admin", "user", "visitor"],
      allowNull: true,
      defaultValue: "user",
    },
  },
  { underscored: true, tableName: "credential" }
);

module.exports = Credential;
