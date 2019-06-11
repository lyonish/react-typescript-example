const common = require("../../../common/common");

const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const mysql = require("promise-mysql");
const db = require("../../db");

const bcrypt = require("bcrypt");

module.exports = (() => {
  app.put("/user/login", bodyParser.json(), async (req, res) => {
    const { username, password } = req.body;

    let statusCode = 200; // or 204?
    let connection; // to keep connection object through promise chain
    let date;
    let admin;
    let owner;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        // return connection.query(`select * from users`);
        return connection.query(
          `select * from users where name = "${username}"`
        );
      })
      .then((results, error) => {
        const passwordMatched = bcrypt.compareSync(
          password,
          results[0].password
        );
        admin = results[0].admin;
        owner = results[0].owner;
        // Wrong password
        if (!passwordMatched) {
          common.log("Password not matched");
          statusCode = 401;
          res.status(statusCode).send();
          // abort chain, otherwise this goes on the next .then
          return Promise.reject("Wrong Password");
        }
        // Correct password
        common.log("Password Matched!");
        const sessionID = bcrypt.genSaltSync();
        date = new Date();
        const loginDate = common.getDatetime(date);

        return connection.query(`
          update users SET \
          session_id = \"${sessionID}\", \
          login_date = \"${loginDate}\" \
          where id = ${results[0].id}
        `);
      })
      .then((error, results, fields) => {
        const sessionID = bcrypt.genSaltSync();
        res.cookie("sessionID", sessionID, {
          expires: new Date(Date.now() + 900000)
        });
        res.status(statusCode).send({
          success: true,
          username: username,
          admin: admin,
          owner: owner
        });
      });
  });
  return app;
})();
