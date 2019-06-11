const express = require("express");
const app = express();

const options = {
  root: "./dist"
};

app.get(`/bundle.js`, function(req, res) {
  res.sendFile(req.url, { root: "./dist/" });
});

app.get("/*", function(req, res) {
  res.sendFile("index.html", options);
});

app.listen(7000, () => console.log("Example app listening on port 7000!"));
