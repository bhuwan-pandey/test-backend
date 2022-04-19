const { getLogin } = require("../src/auth");
const router = require("express").Router();

router.post("/b/login", getLogin);

module.exports = router;
