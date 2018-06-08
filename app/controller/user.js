'use strict';
const models = require('../models');
const config = require('../config');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const createUser = userData => {
  if (userData !== null) {
    const user = models.User.create(userData);
    return user;
  }
  else {
    return Promise.reject('EMAIL_INVALID');
  }
}

//Generate a random token for each user which will serve as userToken
const isValidToken = (req, res, next) => {
  var token = req.params.token;
  if (!token) {
    return Promise.reject('TOKEN_INVALID');
  }

  let user = {};

  return models.User.findOne({ token: token })
    .then(doc => {
      user = doc
      if (user === null) {
        req.tokenstatus = null;
      } else {
        req.levelId = req.params.levelId;
        req.token = token;
        req.tokenstatus = user;
      }
      next();
    }).
    catch(err => {
      return err;
    })

};

//Generate a random token for each user which will serve as userToken
const getExistingFacebookUser = facebookId => {

  if (!facebookId) {
    return Promise.reject('TOKEN_INVALID');
  }

  let user = {};

  return models.User.findOne({ facebookId: facebookId })
    .then(doc => {
      user = doc
      if (user === null) {
        return null;
      } else {
        return user;
      }
    }).
    catch(err => {
      return err;
    })
};

const getExistingWechatUser = wechatId => {

  if (!wechatId)
    return Promise.reject("INVALID_WECHAT_ID");

  let user = {};
  return models.User.findOne({ wechatID: wechatId })
    .then(doc => {
      user = doc
      if (user == null)
        return null;
      else
        return user;
    }).
    catch(err => {
      return err;
    });
}

const generateToken = user => {
  var payload = {
    email: user.email,
    userId: user.id,
    iat: moment().unix(),
    exp: moment().add(350, 'days').unix()
  };
  return jwt.sign(payload, config.jwtKey);
}

const getUserByEmailId = email => {
  return models.User.findOne({ email: email }).then(data => {
    return data;
  }).catch(err => {
    console.log(err);
  });
};

const updateUser = data => {
  let updatedUser = {};
  let referral = {};
  return models.User.findOne({ _id: data.id }).then(userObj => {
    if (userObj == null)
      return Promise.reject('USER_ID_INVALID');
    else {
      userObj.name = data.name;
      userObj.email = data.email;
      userObj.agree = data.agree;
      userObj.promotion = data.promotion;
      userObj.updated = new Date();
      if (data.refLevel != null && data.refBy != null && String(data.id) != String(data.refBy)) {
        models.Referral.find(
          { $and: [{ level: data.refLevel }, { user: data.id }, { referredBy: data.refBy }] })
          .then(refRecord => {
            if (refRecord == '') {
              var refData = {
                user: data.id,
                referredBy: data.refBy,
                level: data.refLevel
              };
              return refData;
            }
            else {
              return null;
            }
          }).then(refData => {
            if (refData != null) {
              models.Referral.create(refData).then(refResult => {
                referral = refResult
                if (referral != null)
                  return referral;

              })
            }
            else {
              return referral = null;
            }
          })

      }
      return userObj.save().then(updatedObj => {
        //console.log("user Saved", updatedObj)
        if (updatedObj != null) {
          updatedUser = updatedObj;
          return updatedUser;
        }
      }).catch(err => {
        console.log(err);
      });
    }
  })
}

module.exports = {
  createUser,
  isValidToken,
  getExistingFacebookUser,
  generateToken,
  updateUser,
  getExistingWechatUser,
  getUserByEmailId
}