const express = require("express");

const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const PORT = process.env.PORT || 5003;

const sequelize = require("./db_config/config");
const Assocations = require("./src/relation");
const error_handler = require("./middleware/error_handler");

//++++++++++++++++++++++++++++++++++++++++++++++++++++//

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// register routes
app.use("/", require("./controllers/auth.js"));
// used for running frontend build along with backend
app.use(express.static(path.join(getDir(), "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(getDir(), "build", "index.html"));
});

app.use(error_handler);

//++++++++++++++++++++++++++++++++++++++++++++++++++++//

Assocations.associate(); // associations for sequelize models

//++++++++++++++++++++++++++++++++++++++++++++++++++++//

console.log("Started @", new Date());

/**
 * make INIT_DB true to reset/format and reconstruct the db
 * make ALTER_DB true to alter the tables to fit models
 * MAKE SURE THAT YOU DONOT DO THIS IN PRODUCTION
 */
const INIT_DB = (process.argv && process.argv.indexOf("--init") !== -1) || true;
const ALTER_DB =
  (process.argv && process.argv.indexOf("--alter") !== -1) || false;
sequelize
  .sync({
    force: INIT_DB,
    alter: ALTER_DB,
  })
  .then(async () => {
    if (INIT_DB) {
      console.log("\n++++++++++ INITIATING SETUP ++++++++++\n");
      await Assocations.populate();
      console.log("\n++++++++++ SETUP  COMPLETED ++++++++++\n");
    }
  })
  .then(async () => {
    server.listen(PORT, () => {
      console.info("Listening on PORT ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    console.error("An error(1) occured:", err.message);
  });

/**
 * generates path whether it has run through a pkg bundled
 * executable or normal script.
 */
function getDir() {
  if (process.pkg) {
    return path.resolve(process.execPath + "/..");
  } else {
    return path.join(require.main ? require.main.path : process.cwd());
  }
}
