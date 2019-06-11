const common = require("../../../common/common");

const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const bodyParser = require("body-parser");

const mysql = require("promise-mysql");
const db = require("../../db");

module.exports = (() => {
    app.put("/user/update", bodyParser.json(), (req, res) => {
        let statusCode = 200;

        //LATER
        // mysql
        //   .createConnection(db.settings)
        //   .then(conn => {
        //     connection = conn;
        //     return connection.query(
        //       "update users SET  owner from users;"
        //     );
        //   })
        //   .then(results => {
        //     res.header({ "Content-Type": "application/json" });
        res.status(statusCode).send("NOT AVAILABLE YET SORRY");
        //   });
    });

    return app;
})();
