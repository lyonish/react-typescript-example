const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const common = require("../../../common/common");
const db = require("../../db");

const mysql = require("promise-mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (() => {
  app.post("/user/create", bodyParser.json(), (req, res) => {
    const { username, email, password, admin, owner } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const date = new Date();
    const registeredDate = common.getDatetime(date);
    let connection;
    let statusCode = 201;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(
          `
          insert into users (name, email, password, admin, owner, registered_date) values (\"${username}\", \"${email}\", \"${hash}\", ${admin}, ${owner}, \"${registeredDate}\" );
          `
        );
      })
      .then(results => {
        res.status(statusCode).send("ok");
      });
  });

  return app;
})();

