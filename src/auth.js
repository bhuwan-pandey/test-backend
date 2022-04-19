const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Credential = require("../models/credential");
const { jwtKey } = require("./constants");

exports.getLogin = async (req, res, next) => {
  Credential.findOne({ where: { username: req.body.username || "" } })
    .then(async (credential) => {
      if (credential) {
        const matched = await bcrypt.compare(
          req.body.password || "",
          credential.password
        );
        if (matched) {
          let token = { credentialID: credential.id };
          credential.getUser().then(async (user) => {
            if (!user) {
              return res.status(300).send({
                success: false,
                message: "Couldnot find profile !",
              });
            }
            token.username = credential.username;
            token.userID = user.id;
            token.remember = req.body.remember;
            token.role = credential.role;
            token = jwt.sign(token, jwtKey, {
              expiresIn: req.body.remember ? "72h" : "1h",
            });
            await credential.save();
            return res.send({
              success: true,
              message: { token: token },
            });
          });
        } else {
          return res.send({
            success: false,
            message: "Username or Password Incorrect !",
          });
        }
      } else {
        return res.send({
          success: false,
          message: "Username or Password Incorrect !",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      err.httpStatusCode = 500;
      return next(err);
    });
};
