'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');
const moment = require('moment-timezone');

const UserSchema = new Schema({
  token: {
    type: String,
    trim: true,
    default: '',
  },
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    index: true,
    sparse: true
  },
  agree: {
    type: Number,
    default: 0
  },
  promotion: {
    type: Number,
    default: 0
  },
  userType: {
    type: Number,
  },
  facebookId: {
    type: String,
    unique: true,
    trim: true,
    index: true,
    sparse: true
  },
  fbemail: {
    type: String,
    unique: true,
    trim: true,
    index: true,
    sparse: true
  },
  wechatID: {
    type: String,
    unique: true,
    trim: true,
    index: true,
    sparse: true
  },
  shortUrl: {
    type: String,
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
UserSchema.index({ facebookId: 1, email: 1, wechatID: 1 });
module.exports = mongoose.model('user', UserSchema);
