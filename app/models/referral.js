'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const moment = require('moment-timezone');
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const referralSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'user'
  },
  referredBy: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'user'
  },
  level: {
    type: Number,
    default: 0
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: moment.tz('Asia/Singapore')
  }
});

//Create index for userToken since we use it to filter the user 
referralSchema.index({ user: 1, referredBy: 1, level: 1 });
module.exports = mongoose.model('Referral', referralSchema);
