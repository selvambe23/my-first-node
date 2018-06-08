"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const connectMongo = require('connect-mongo');
const utils = require('./app/controller/utils');
const db = require('./app/lib/db');
const PORT = process.env.APP_PORT || 3000;
const ADDRESS = process.env.ADDRESS || '0.0.0.0';
const ENV = process.env;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const mongoose = require('mongoose');
const i18n = require('i18n');
const MongoStore = connectMongo(session);

//configure i18n
i18n.configure({
  locales: ['en_US'],
  directory: path.join(__dirname, './public/locales'),
  defaultLocale: 'en_US'
});

const sessionStore = new MongoStore({
  mongooseConnection: db.dbconnection(mongoose)
})

const app = express();

require('./app/config/passport')(passport);

app.use(i18n.init);

app.use(function (req, res, next) {
  req.i18n = i18n;
  req.i18n.setLocale('en_US');
  next();
});

app.use(cookieParser());

app.use(session({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routing with express & EJS
const frontPages = require('./app/routes/front/index');

app.use('/', frontPages);

app.use(express.static(`${__dirname}/build`));
app.use(express.static(`${__dirname}/public`));

/*accessing log file */
app.use(express.static(`${__dirname}/logs`));

app.use('/views', express.static(__dirname + '/views'));


// 404 page handler
app.use(function (req, res, next) {
  res.status(404);
  res.render('front/404', {
    locales: req.i18n
  })
});


const server = app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});