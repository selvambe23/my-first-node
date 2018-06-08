"use strict"
const game = require('../controller/game');
let levelDetail = {};
levelDetail = game.level;
require('dotenv').config({
  path: process.env.DOTENV || '.env'
});
const env = process.env.NODE_ENV,
  appUrl = process.env.APP_URL;

const config = {
  itAdminEmail: '', //should be from config
  emailProdAPIErrors: '', //should be from config
  env: env,
  appUrl: appUrl,
  refUrl: appUrl + '/referral/',
  level: levelDetail.level,
  lang: ['en_US'],
  default_lang: 'en_US',
  awsRegion: process.env.APP_AWS_DEFAULT_REGION,
  awsAccessKey: process.env.APP_AWS_ACCESS_KEY_ID,
  awsSecret: process.env.APP_AWS_SECRET_ACCESS_KEY
};

config.sendgrid = {
  apiKey: process.env.APP_SENDGRID_API_KEY,
  from_email: "no-reply@krds.fr",
  to_email: 'selvam.m@krds.fr',
  subject: 'Total Oil Ar Game',
  message: 'You have a received a new quote request.'
}


config.dbname = `total-oil-ar-${env}`;
config.mongoUser = process.env.MONGO_USER;
config.mongoPassword = process.env.MONGO_PWD;
config.mongoHost = process.env.MONGO_HOST;
config.jwtKey = "secret";


switch (process.env.NODE_ENV) {
  case 'local':
    config.facebook = {
      clientId: '598447157177305',
      clientSecret: 'be7283327f8b30a0295d2c18f6bb5bf3',
      callbackUrl: appUrl + '/auth/facebook/callback',
      profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields: ['id', 'email', 'name']
    };
    config.wechat = {
      appId: 'wx573d43b7c2ec2a06',
      appSecret: 'cac66595b164bdc9aa1fe36bfdd4e422',
      callbackUrl: 'https://total-oil-badminton-dev.dev.kacdn.net/connect/response'
    };
    config.qrImage = "qrcode_loc";
    break
  case 'development':
    config.facebook = {
      clientId: '120409915428576',
      clientSecret: 'd11044b11883bb610845fdf2a9ee12c1',
      callbackUrl: appUrl + '/auth/facebook/callback',
      profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields: ['id', 'email', 'name']
    };
    config.wechat = {
      appId: 'wx9a972d128656aa80',
      appSecret: '5c0508763604ef3bfb09db021c644579',
      callbackUrl: 'https://total-oil-badminton-dev.dev.kacdn.net/connect/response'
    };
    config.qrImage = "qrcode_dev";
    break
  case 'testing':
    config.facebook = {
      clientId: '',
      clientSecret: '',
      callbackUrl: appUrl + '/auth/facebook/callback',
      profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields: ['id', 'email', 'name']
    };
    config.wechat = {
      appId: 'wx9a972d128656aa80',
      appSecret: 'dc30829d10c1c3e9745c822490358daf',
      callbackUrl: 'https://total-oil-badminton-dev.dev.kacdn.net/connect/response'
    };
    break
  case 'staging':
    config.facebook = {
      clientId: '162569601078728',
      clientSecret: '5c0508763604ef3bfb09db021c644579',
      callbackUrl: appUrl + '/auth/facebook/callback',
      profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields: ['id', 'email', 'name']
    };
    config.wechat = {
      appId: 'wx485172f20f442901',
      appSecret: '85b5642980cd480ec7c08185c4247b94',
      callbackUrl: 'http://total-oil-badminton-staging.kacdn.cn/connect/response'
    };
    config.qrImage = "qrcode_stag";
    break
  case 'production':
    config.facebook = {
      clientId: '610226182647880',
      clientSecret: '45eccf83363221664557f93f91febb23',
      callbackUrl: appUrl + '/auth/facebook/callback',
      profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      profileFields: ['id', 'email', 'name']
    };
    config.wechat = {
      appId: 'wx485172f20f442901',
      appSecret: '85b5642980cd480ec7c08185c4247b94',
      callbackUrl: 'https://totalquartz360.com/connect/response'
    };
    config.qrImage = "qrcode_production";
    break
  default:
    throw new Error("Unsupported environment:", process.env.NODE_ENV)
}

module.exports = config;