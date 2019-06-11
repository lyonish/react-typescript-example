const common = require("../../../common/common");

const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const mysql = require("promise-mysql");
const db = require("../../db");

module.exports = (() => {
  app.get("/users/list", (req, res) => {
    let statusCode = 200;
    let connection;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(
          "select id, name, email, admin, owner from users;"
        );
      })
      .then(results => {
        // mysql doesn't support true/false (internally they are 1/0 as tinyint(1))
        results.forEach(result => {
          if (result.admin === 1) {
            result.admin = true;
          } else {
            result.admin = false;
          }

          if (result.owner === 1) {
            result.owner = true;
          } else {
            result.owner = false;
          }
        });

        res.header({ "Content-Type": "application/json" });
        res.status(statusCode).json(results);
      });
  });

  return app;
})();
