"use strict";

const models = require('../models');
const config = require('../config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const user = require('./user');
const logger = require('../lib/logger');
const request = require('bluebird').promisifyAll(require('request'), { multiArgs: true });

const appId = config.wechat.appId;
const appSecret = config.wechat.appSecret;

//Get connect accesstoken
const getAccessToken = (data) => {
  return new Promise((resolve, reject) => {

    const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${data.query.code}&grant_type=authorization_code`;

    logger.info('getAccessToken fn, token url : ' + tokenUrl);

    request.get(tokenUrl, (error, response, body) => {
      if (error || response.statusCode != 200)
        reject({ text: 'getAccessToken fn return a statusCode : ' + response.statusCode });

      const data = JSON.parse(body);

      logger.info('getAccessToken fn, return data : ' + JSON.stringify(body));

      if (data == null || data.openid == null || data.access_token == null)
        reject({ text: 'getAccessToken fn return empty data : ' + JSON.stringify(body) });

      resolve(data);
    })
  });
};

// Get conneted user info
const getUserInfo = (data) => {
  return new Promise((resolve, reject) => {

    const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}&lang=en_US`;

    logger.info('getUserInfo fn, userinfo url : ' + userInfoUrl);

    request.get(userInfoUrl, (error, response, body) => {
      if (error || response.statusCode != 200)
        reject({ text: 'getUserInfo fn return a statusCode : ' + response.statusCode });

      const user_obj = JSON.parse(body);

      logger.info('getUserInfo fn, return data : ' + JSON.stringify(body));

      if (user_obj == null || user_obj.errcode)
        reject({ text: 'getUserInfo fn return empty data', error: 1 })

      resolve(user_obj);
    });
  });
};

module.exports = {
  getAccessToken,
  getUserInfo
}