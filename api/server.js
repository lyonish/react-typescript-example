const fs = require("fs");
const path = require("path");
const express = require("express");
const app = require("express")();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const common = require("../common/common");
import users from "~/endpoints/users";
import feedbacks from "~/endpoints/feedbacks";

const NODE_PORT = process.env.NODE_PORT || 7071;

// DB
const mysql = require("promise-mysql");
const db = require("./db");

app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use("/api", users.list);
app.use("/api", users.create);
app.use("/api", users.update);
app.use("/api", users.destroy);
app.use("/api", users.login);

app.use("/api", feedbacks.list);
app.use("/api", feedbacks.create);
app.use("/api", feedbacks.update);
app.use("/api", feedbacks.destroy);

app.get("/", (req, res) => {
  res.send("----API ONLINE----");
});

db.init().then(() => {
  // listen after DB connection
  app.emit("ready");
});

app.on("ready", function() {
  app.listen(NODE_PORT, function() {
    common.log("API running on port %d", NODE_PORT);
  });
});
