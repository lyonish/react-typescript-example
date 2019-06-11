const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const common = require("../../../common/common");
const db = require("../../db");

const mysql = require("promise-mysql");

module.exports = (() => {
  app.get("/feedbacks/list", bodyParser.json(), (req, res) => {
    let { reviewer } = req.query;
    let statusCode = 200;
    let connection;

    let _reviewer = reviewer ? `reviewer = "${reviewer}"` : '';
    let filter = Object.keys(req.query).length === 0 ? '' : `where ${_reviewer}`;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(
          `select id, reviewer, reviewee, evalscore, review_text_1, review_text_2, review_text_3, review_text_4, assigned_date as assignedDate, due_date as dueDate from feedbacks ${filter};`
        );
      })
      .then(results => {
        res.header({ "Content-Type": "application/json" });
        res.status(statusCode).json(results);
      });
  });

  return app;
})();
