'use strict'

const express = require('express')
  , utils = require('../../controller/utils')
  , jwt = require('jsonwebtoken')
  , config = require('../../config')
  , router = express.Router();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtKey)
    req.userData = decoded;
    next();
  }
  catch (error) {
    res.status(401).json({
      message: 'Auth Failed'
    })
  }
};