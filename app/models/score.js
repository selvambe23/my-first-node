'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const moment = require('moment-timezone');
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


const scoreSchema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'user'
  },
  score: {
    type: Number,
    trim: true,
  },
  milliSec: {
    type: Number,
    trim: true,
  },
  level: {
    type: Number,
    default: 0
  },
  scene: {
    type: Number,
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: moment.tz('Asia/Singapore')
  }
});

//Create index for score since we use it to filter the scores 
scoreSchema.index({ user: 1, level: 1, scene: 1 });
module.exports = mongoose.model('Score', scoreSchema);
