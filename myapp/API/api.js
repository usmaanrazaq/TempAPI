var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./Utilities/db');
var app = express();
var users = require('./routes/routeUsers');
var status = require('./routes/routeStatus');
var comments = require('./routes/routeComments');
var authenticate = require('./Authenticate');
var config = require('./config');
var jwt = require('jsonwebtoken');
var router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//CONNECT TO DATABASE

db.connectDB(); // CONNECT TO DATABASE

//SETTING UP ROUTES
app.use('/authenticate', authenticate);
app.use('/users', users);
app.use('/status', status);
app.use('/comments', comments);
module.exports = app;