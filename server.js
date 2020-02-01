//NPM Dependencies
const express = require('express');
const cors = require('cors');
const sequelize = require('sequelize');
const passport = require('passport');
const bodyParser = require('body-parser');
const { body, oneOf, validationResult } = require('express-validator');

//Initializations
const app = express();
const indexController = require('./routes/index');
const usersController = require('./routes/users');

//Connect to sql
const mysql = require('mysql2');
const dbconfig = require('./config/dbconfig')
const db = mysql.createConnection(dbconfig.db.local);

db.connect((err) => {
  if (err){
    throw err;
  } else {
    console.log("Connected");
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Invoke controllers
indexController(app);
usersController(app, db, body, oneOf, validationResult);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
