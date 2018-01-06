// PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var serverConfig = require('./config.js');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var passportOptions = require('./passport/config');


// IMPORTS //
var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');
var authRoutes = require('./routes/authentication');

// CREATE APP //
var app = express();

mongoose.connect(serverConfig.database, function(err, db){
    if(err) console.log(err);
    console.log("connection with DB has been made");
});

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));
app.use('/tmp', express.static(path.join(__dirname, '/routes/tmp')));
app.use('/fonts', express.static(path.resolve(__dirname, '../client/fonts')));



// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({
    secret: "random",
    resave: false,
	saveUninitialized: false
}))
passport.use(passportOptions.authStrategy);
passport.serializeUser(passportOptions.authSerializer);
passport.deserializeUser(passportOptions.authDeserializer);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES //
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
