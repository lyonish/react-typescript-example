const common = require("../common/common");

const mysql = require("promise-mysql");
const settings = {
  host: "localhost",
  user: "reacttypescript",
  password: "reacttypescript",
  database: "reacttypescript"
};

let connection;

function init() {
  return mysql
    .createConnection(settings)
    .then((conn, error) => {
      connection = conn;
      if (error) {
        common.log("Error on DB connection");
        console.log(error);
      }

      common.log("initialize DB");
      return connection.query(
        `
    create table if not exists users \
    ( \
    id INT(12) not null auto_increment primary key, \
    name varchar(40) not null UNIQUE, \
    email varchar(40) not null UNIQUE,  \
    password varchar(64) not null,  \
    admin boolean not null default false, \
    owner boolean not null default false,  \
    session_id varchar(64), \
    login_date datetime, \
    registered_date datetime not null
    );`
      );
    })
    .then((error, results, fields) => {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      return connection.query(
        `
    create table if not exists feedbacks \
    ( \
    id INT(12) not null auto_increment primary key, \
    reviewer varchar(40) not null, \
    reviewee varchar(40) not null, \
    evalscore INT(2), \
    review_text_1 text, \
    review_text_2 text, \
    review_text_3 text, \
    review_text_4 text, \
    assigned_date datetime not null, \
    due_date datetime not null, \
    submit_date datetime \
    );`
      );
    })
    .then((error, results, fields) => {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
    });
}

module.exports = {
  settings: settings,
  init: init
};
