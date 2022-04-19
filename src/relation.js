const { theDefaults } = require("./constants");
const User = require("../models/user");
const Credential = require("../models/credential");

module.exports = {
  associate: () => {
    User.hasOne(Credential, {
      foreignKey: "user_id",
      as: "credential",
      onDelete: "cascade",
    });
    Credential.belongsTo(User, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  },

  populate: async () => {
    await User.bulkCreate([theDefaults.adminUser, theDefaults.normalUser], {
      include: [{ model: Credential, as: "credential" }],
    }).then((users) => {
      if (!users) throw new Error("Defaults couldnot be created !");
    });
  },
};
