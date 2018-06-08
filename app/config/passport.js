'user strict'

const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

const models = require('../models');
const usercontroller = require('../controller/user');
const config = require('../config');
const moment = require('moment');
const logger = require('../lib/logger');

module.exports = (passport) => {

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    models.User.findById(id, function (err, user) {
      done(null, user);
    })
  });

  var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

  passport.use(new FacebookStrategy(
    {
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackUrl,
      profileURL: config.facebook.profileURL,
      profileFields: config.facebook.profileFields
    },
    function (accessToken, refreshToken, profile, done) {
      usercontroller.getExistingFacebookUser(profile.id).then((data) => {
        if (data != null) {
          user = Object.assign({}, { id: data.id, jwttoken: usercontroller.generateToken(data) })
          return user;
        }
        else {
          const randomToken = Math.random().toString().slice(2, 10);
          let shortUrl = config.refUrl + config.level + '/' + randomToken;
          let newUser = {
            token: randomToken,
            facebookId: profile.id,
            userName: profile.name.givenName + ' ' + profile.name.familyName,
            userType: 1,
            shortUrl: shortUrl
          };

          if (profile.emails[0].value != null) {
            newUser.fbemail = (profile.emails[0].value).toLowerCase();
          }
          return models.User.create(newUser)
        }
      }).then((data) => {
        if (data != null) {
          const user = Object.assign({}, { id: data.id, jwttoken: usercontroller.generateToken(data) })
          done(null, user);
        } else {
          logger.info("No User Selected: ", err)
        }
      }).catch(err => {
        logger.info("Facebook login: ", err)
        done(null, err);
      })
    }
  ));
}