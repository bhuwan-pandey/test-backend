const jwtKey = "sample_test";

const errorMap = {
  401: "You are not authorized to perform this action !",
  201: "Action couldnot complete due to unknown reason(s) !",
  500: "Something went wrong while performing the action !",
};

const theDefaults = {
  adminUser: {
    name: "Administrator",
    credential: { username: "admin", password: "admin", role: "admin" },
  },
  normalUser: {
    name: "User-A",
    credential: { username: "user", password: "user", role: "user" },
  },
};

module.exports = { errorMap, theDefaults, jwtKey };
