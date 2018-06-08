"use strict"
const config = require('../config');
const winston = require('winston'),
  CloudWatchTransport = require('winston-aws-cloudwatch');

const NODE_ENV = process.env.NODE_ENV || 'local';

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    }),
    new (winston.transports.File)({
      filename: process.env.LOG_PATH || './usr/logs/filelog-info.log',
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
});

const loggerConfig = {
  logGroupName: `total-oil-badminton-${config.env}`,
  logStreamName: NODE_ENV,
  createLogGroup: true,
  createLogStream: true,
  awsConfig: {
    awsRegion: config.awsRegion,
    awsAccessKeyId: config.awsAccessKey,
    awsSecretKey: config.awsSecret,
  },
  formatLog: function (item) {
    return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
  }
}

if (NODE_ENV != 'local') logger.add(CloudWatchTransport, loggerConfig);

logger.level = process.env.LOG_LEVEL || "silly";

logger.stream = {
  write: function (message, encoding) {
    logger.log(message);
  }
};

module.exports = logger;