var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./API/api');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//BODY PARSER USED TO GET REQUEST BODY IN JSON FORMAT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'FitnessTracker'))); //LOOK FOR STATIC FILES IN THE FITNESSTRACKER FOLDER

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://usmaanrazaq.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, DXscript, DXCss ");
  next();
});
//API SERVICE
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});
var listener = app.listen(8080, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8080
});
// error handler



module.exports = app;
