"use strict"

const express = require('express')
  , path = require('path')
  , jwt = require('jsonwebtoken')
  , i18n = require('i18n')
  , config = require('../../config')
  , moment = require('moment')
  , passport = require('passport')
  , checkAuth = require('../middleware/check-auth')
  , utils = require('../../controller/utils')
  , user = require('../../controller/user')
  , score = require('../../controller/score')
  , scenes = require('../../controller/scenes')
  , validator = require("email-validator")
  , logger = require('../../lib/logger')
  , wechat = require('../../controller/wechat')
  , MobileDetect = require('mobile-detect')
  , useragent = require('useragent')
  , popupTools = require('popup-tools')
  , router = express.Router();

useragent(true);

if (config.env != "local") {
  router.use(function (req, res, next) {
    let md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile() != null || md.tablet() != null) {
      next();
    }
    else {
      var path = req.path.split('.');
      if (path[1] == null) {
        res.render('front/desktop', {
          appUrl: config.appUrl,
          locales: req.i18n,
          qrcode: config.qrImage
        });
      } else {
        next();
      }
    }
  });
}


router.get('/', function (req, res) {
  //if (req.isAuthenticated()) return res.redirect('/scenes');
  //else
  res.render('front/login', {
    appUrl: config.appUrl,
    locales: req.i18n,
    user: req.user,
    isauth: req.isAuthenticated()
  });
});

router.get('/fblogin', passport.authenticate('facebook',
  { scope: ['public_profile', 'email'], display: 'popup' }
));

router.get('/auth/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    if (err) {
      logger.error(err)
      return res.status(500).send("Internal Server Error " + err);
    }
    if (!user) return res.redirect('/');
    req.logIn(user, function (err) {
      if (err) {
        logger.error(err)
        return res.status(500).send("Internal Server Error " + err);
      }
      var agent = useragent.parse(req.headers['user-agent']);
      logger.info("Agent Info", agent.toAgent());
      if (agent.toAgent() == "Facebook 171.0.0") {
        res.redirect('/scenes');
      } else {
        res.end(popupTools.popupResponse(req.user))
      }
    });
  })(req, res, next);
});



router.get('/wechatlogin', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/scenes');
  }

  if (config.env != 'local') {
    let connectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=';
    connectUrl += config.wechat.appId;
    connectUrl += '&redirect_uri=';
    connectUrl += encodeURIComponent(config.wechat.callbackUrl) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';

    logger.info('connect route, url : ' + connectUrl);
    res.redirect(connectUrl);
  } else {
    res.redirect('/');
  }
});

router.get('/connect/response', function (req, res, next) {
  logger.info('Route response input : ' + req.query.code);
  if (req.query.code && req.query.code === 'authdeny')
    res.redirect('/');

  wechat.getAccessToken(req).then((data) => {
    return wechat.getUserInfo(data).then((data) => {
      logger.info('getUserInfo fn, returns userinfo : ' + data);
      user.getExistingWechatUser(data.openid).then((result) => {
        if (result == null) {
          const randomToken = Math.random().toString().slice(2, 10);
          let shortUrl = config.refUrl + config.level + '/' + randomToken;
          let newUser = {
            token: randomToken,
            wechatID: data.openid != null ? data.openid : null,
            userName: data.nickname != null ? data.nickname : null,
            userType: 2,
            shortUrl: shortUrl
          };
          user.createUser(newUser).then((data) => {
            let userCreated = Object.assign({}, { id: data.id, jwttoken: user.generateToken(data) })
            return userCreated;
          }).then((userData) => {
            logger.info('new user saved: ' + userData);
            req.logIn(userData, function (err) {
              if (err) { return res.status(500).send("Internal Server Error " + err); }
              return res.redirect('/scenes');
            });
          }).catch((err) => {
            logger.info('Save data Error ' + err);
          });
        } else {
          req.logIn(result, function (err) {
            logger.log("request user login ", result);
            if (err) { return res.status(500).send("Internal Server Error " + err); }
            return res.redirect('/scenes');
          });
        }
      });
    });
  }).catch((error) => {
    logger.info(error.text);
    res.redirect('/');
  });
});

router.get('/scenes', isLoggedIn, function (req, res) {
  if (req.user.email == null || req.user.agree == 0) {
    score.getUserscore(req.user._id).then(data => {
      if (data != null) {
        res.redirect('/score');
      } else {
        scenes.scenes(req, res);
      }
    })
  } else {
    scenes.scenes(req, res);
  }
});

router.get('/scene/:sceneId', isLoggedIn, function (req, res) {
  req.user.jwtToken = user.generateToken(req.user);
  var isScene = scenes.getscene(req);
  let path = 'front/scene/';
  if (isScene) {
    res.render(path, {
      locales: req.i18n,
      appUrl: config.appUrl,
      scene: req.sceneDetail,
      cordinate: req.cordinates,
      user: req.user,
    });
  } else {
    res.render('front/404', {
      locales: req.i18n
    })
  }

});

router.post('/saveScore', checkAuth, function (req, res, next) {
  let data = {
    score: req.body.score,
    milliSec: req.body.milliSec,
    user: req.user,
    sceneId: req.body.sceneId,
    isBonus: req.body.isBonus
  };

  score.saveScore(data).then((scoreObj) => {
    if (scoreObj != '') {
      res.status(res.statusCode).json({
        error: 0,
        data: JSON.stringify(scoreObj)
      });
    }
    else {
      res.status(res.statusCode).json({
        error: 1,
        message: "Score not saved"
      });
    }
  });

});

router.get('/score', isLoggedIn, score.getScore, function (req, res) {
  res.render('front/score', {
    locales: req.i18n,
    appUrl: config.appUrl,
    user: req.user,
    newUser: req.user = (req.user.email == null || req.user.agree == 0) ? true : false,
    scoreDetail: req.currScore,
    best: req.bestScore
  });
});

router.post('/updateUser', checkAuth,
  function (req, res, next) {
    let err = 0,
      msg = {};
    if (req.body.name == '') {
      err = 1;
      msg = { el: "name", txt: "Name is required" }
    } else if (req.body.email == null && !validator.validate(req.body.email)) {
      err = 1;
      msg = { el: "email", txt: "Email is required and should be email" }
    } else if (req.body.agree == 0 || typeof req.body.agree == 'undefined') {
      err = 1;
      msg = { el: "agree", txt: "Accept terms and condition" }
    }
    if (err == 1)
      return res.status(422).json({ err: 1, message: msg });

    let data = {
      id: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      agree: req.body.agree,
      promotion: (typeof req.body.promotion == 'undefined') ? 0 : req.body.promotion,
      refLevel: (typeof req.body.refLevel != 'undefined' && req.body.refLevel != '') ? req.body.refLevel : null,
      refBy: (typeof req.body.refBy != 'undefined' && req.body.refBy != '') ? req.body.refBy : null,
    };
    user.getUserByEmailId(data.email).then(exsistUser => {
      if (exsistUser === null) {
        user.updateUser(data).then(updatedUser => {
          if (updatedUser != '') {
            res.status(res.statusCode).json({
              error: 0,
              data: JSON.stringify(updatedUser)
            });
          }
        });
      }
      else {
        return res.status(422).json({ err: 1, message: "Email Id already regeistered" });
      }
    }).catch(err => {
      return res.status(422).json({ err: 1, message: "Email Id already regeistered" });
    })

  });

router.get('/leaderboard', isLoggedIn, score.getTopScore, function (req, res) {
  if (req.user.email != null && req.user.agree != 0) {
    res.render('front/leaderboard', {
      locales: req.i18n,
      user: req.user,
      topUsers: req.topTenList
    });
  }
  else
    res.redirect('/score');
});

router.get('/referral/:levelId/:token', user.isValidToken, function (req, res) {
  if (req.isAuthenticated()) return res.redirect('/scenes');
  else {
    if (req.tokenstatus != null) {
      res.render('front/login', {
        appUrl: config.appUrl,
        user: req.user,
        locales: req.i18n,
        refLevel: req.levelId,
        refBy: req.tokenstatus._id,
        isauth: req.isAuthenticated()
      });
    }
    else
      res.render(404);
  }
});

router.get('/profile', isLoggedIn, score.levelBasedScore, function (req, res) {
  if (req.user.email != null && req.user.agree != 0) {
    res.render('front/profile', {
      locales: req.i18n,
      user: req.user,
      scores: req.scoresByLevel
    })
  }
  else {
    res.redirect('/score');
  }
});

router.get('/logout', function (req, res) {
  if (!req.isAuthenticated()) res.redirect('/');
  req.logout();
  res.render('front/logout');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = router;