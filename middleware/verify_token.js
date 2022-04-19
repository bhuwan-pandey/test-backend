const jwt = require("jsonwebtoken");
const { jwtKey } = require("../src/constants");

const verify_token = (req, res, next) => {
  req.token = req.headers["authorization"];
  if (req.token) {
    req.token = req.token.split(" ")[1];
    jwt.verify(req.token, jwtKey, (err, decoded) => {
      if (err) {
        res
          .status(300)
          .json({ success: false, message: "Authorization Error!" });
      } else {
        req.token = decoded;
        next();
      }
    });
  } else throw Error;
};

module.exports = verify_token;
