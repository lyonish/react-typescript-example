const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const common = require("../../../common/common");
const db = require("../../db");

const mysql = require("promise-mysql");

module.exports = (() => {
  app.post("/feedbacks/create", bodyParser.json(), (req, res) => {
    // This is for assignment.
    // reviwers submit to "update"
    const { reviewer, reviewee, dueDate } = req.body;
    const date = new Date();
    const assignedDate = common.getDatetime(date);
    let statusCode = 200;
    let connection;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(
          `
          insert into feedbacks (reviewer, reviewee, assigned_date, due_date ) values (\"${reviewer}\", \"${reviewee}\", \"${assignedDate}\", \"${dueDate}\" );
          `
        );
      })
      .then(results => {
        res.status(statusCode).send("ok");
      });
  });

  return app;
})();

