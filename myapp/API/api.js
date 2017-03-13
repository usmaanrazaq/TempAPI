var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./Utilities/db');
var app = express();
var temp = require('./routes/routeTemp');


var config = require('./config');
var jwt = require('jsonwebtoken');
var router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//CONNECT TO DATABASE

db.connectDB(); // CONNECT TO DATABASE

//SETTING UP ROUTES

app.use('/temp', temp);

module.exports = app;