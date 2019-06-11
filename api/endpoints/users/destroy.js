const common = require("../../../common/common");

const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const mysql = require("promise-mysql");
const db = require("../../db");

module.exports = (() => {
  app.delete("/users/destroy", (req, res) => {
    const { name } = req.query;
    let statusCode = 204; // this just adds queue so maybe just 200 ...?
    let connection;

    //TODO: need to confirm the sender is under the valid session and who has ownership

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(`delete from users where name = \"${name}\";`);
      })
      .then(results => {
        res.status(statusCode).json("ok");
      });
  });

  return app;
})();
