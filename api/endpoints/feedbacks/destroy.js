const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const common = require("../../../common/common");
const db = require("../../db");

const mysql = require("promise-mysql");

module.exports = (() => {
  app.delete("/feedbacks/destroy", bodyParser.json(), (req, res) => {
    common.log("destroy");
    const { id } = req.query;
    let statusCode = 204;
    let connection;

    mysql
      .createConnection(db.settings)
      .then(conn => {
        connection = conn;
        return connection.query(`delete from feedbacks where id = ${id};`);
      })
      .then(results => {
        res.status(statusCode).json("ok");
      });
  });

  return app;
})();
