const logger = require('./logger');
var fs = require('fs');
var config = require("../config");
var sg = require('sendgrid')(config.sendgrid.apiKey);

const sendMail = (mailData) => {
  logger.info(mailData);
}

module.exports = {
  sendMail: sendMail
}