const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const common = require("../../../common/common");
const db = require("../../db");

const mysql = require("promise-mysql");

module.exports = (() => {
  app.put("/feedback/update", bodyParser.json(), (req, res) => {
    // This is for assignment.
    // reviwers submit to "update"
    const { id, evalscore, field1, field2, field3 } = req.body;
    const date = new Date();
    // const assignedDate = common.getDatetime(date);
    let statusCode = 200;
    let connection;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(
          `
          update feedbacks SET evalscore = ${evalscore}, review_text_1 = \"${field1}\", review_text_2 = \"${field2}\", review_text_3 = \"${field3}\"  where id = ${id};
          `
        );
      })
      .then(results => {
        res.status(statusCode).send("ok");
      })
      .catch(error => {
        console.log(error);
      });
  });

  return app;
})();
