'use strict';
const models = require('../models');
const config = require('../config');
const game = require('./game');
let scenesList = {};
scenesList = game.sceneList;

const saveScore = data => {
  if (data.score !== '' && data.user !== '' && data.sceneId !== '' && data.isBonus !== '') {
    let scoreData = {
      user: data.user._id,
      score: (data.isBonus == 0) ? data.score : parseInt(data.score) * 2,
      milliSec: data.milliSec,
      level: config.level,
      scene: data.sceneId
    };
    const scoreObj = models.Score.create(scoreData);
    return scoreObj;
  }
  else {
    return Promise.reject('DATA_INVALID');
  }
}

const getScore = function (req, res, next) {
  return models.Score.find({ user: req.user._id }).sort({ _id: -1 }).limit(1).then(data => {
    if (data != null) {
      return req.currScore = data[0];
    }
  })
    .then(userCurrScore => {
      return models.Score.aggregate([
        { $match: { $and: [{ level: config.level }, { scene: userCurrScore.scene }, { user: userCurrScore.user }] } },
        { $group: { _id: null, "bestScore": { "$max": "$score" } } }
      ]);
    })
    .then(sceneBestScore => {
      if (sceneBestScore != null) {
        req.bestScore = sceneBestScore[0].bestScore;
        next();
      }
    })
    .catch(err => {
      console.log(err);
    });
}

const getTopScore = function (req, res, next) {
  var topTenList = [], count = 10, index = 1, multiplier = 0, maxCount = 9, flag = 0, className = '';
  return models.Score.aggregate([
    { $match: { level: config.level } },
    { $group: { _id: { user: "$user", scene: "$scene", level: "$level" }, "highScore": { "$max": "$score" }, "milliSec": { "$min": "$milliSec" } } },
    { $group: { _id: { user: "$_id.user", level: "$_id.level", milliSec: "$_id.milliSec" }, totalScore: { $sum: "$highScore" }, "milliSec": { "$min": "$milliSec" } } },
    { $sort: { totalScore: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: '_id.user',
        foreignField: '_id',
        as: 'profile'
      }
    },
    { $unwind: "$profile" },
    {
      $lookup: {
        from: 'referrals',
        localField: 'profile._id',
        foreignField: 'referredBy',
        as: 'refcount'
      }
    },
    {
      $unwind: {
        path: "$refcount",
        preserveNullAndEmptyArrays: true
      }
    }

  ])
    .then(topUsers => {
      if (topUsers != null) {
        var topScores = {};
        var refObj = {};
        topUsers.forEach((user, i) => {
          if (user.refcount != null) {
            if ((user._id.user in refObj)) {
              refObj[user._id.user].push(user.refcount);
            } else {
              refObj[user._id.user] = [user.refcount];
            }
          }

          if (String(req.user._id) == String(user._id.user)) {
            className = "currentUser";
          } else {
            className = '';
          }

          var userDetail = {
            id: user.profile._id,
            userName: user.profile.userName,
            class: className,
            totalScore: user.totalScore,
            milliSec: user.milliSec,
            refcount: refObj
          };

          if (!(user._id.user in topScores)) {
            topScores[user._id.user] = [userDetail];
          }

        });

        var obj = [];
        Object.keys(topScores).map((key, i) => {
          var referredCount = 0;
          if (topScores[key][0].refcount[key] != null) {
            referredCount = topScores[key][0].refcount[key].length;
          }
          /* for testing purpose
          if (referredCount >= 1 && referredCount <= 2)
            multiplier = 2;
          else if (referredCount >= 3 && referredCount <= 4)
            multiplier = 3;
          else if (referredCount >= 10 && referredCount <= 14)
            multiplier = 3;
          else if (referredCount >= 15)
            multiplier = 4;*/

          if (referredCount >= 1 && referredCount <= 4)
            multiplier = 1;
          else if (referredCount >= 5 && referredCount <= 9)
            multiplier = 2;
          else if (referredCount >= 10 && referredCount <= 14)
            multiplier = 3;
          else if (referredCount >= 15)
            multiplier = 4;

          //console.log(topScores[key][0].totalScore)

          topScores[key][0].referredCount = referredCount;
          topScores[key][0].multiplier = multiplier;
          topScores[key][0].refbonusScore = (multiplier != 0 && referredCount != 0) ? parseInt(topScores[key][0].totalScore) * parseInt(multiplier) : topScores[key][0].totalScore;

          topScores[key][0].extraPoint = (multiplier != 0 && referredCount != 0) ? parseInt(topScores[key][0].refbonusScore) - parseInt(topScores[key][0].totalScore) : 0;
          obj.push(topScores[key][0]);
        });

        obj.sort(function (a, b) {
          if ((typeof b.refbonusScore === 'undefined' && typeof a.refbonusScore !== 'undefined') || a.refbonusScore < b.refbonusScore) {
            return 1;
          }
          if ((typeof a.refbonusScore === 'undefined' && typeof b.refbonusScore !== 'undefined') || a.refbonusScore > b.refbonusScore) {
            return -1;
          }
          if (a.refbonusScore == b.refbonusScore) {
            if (a.milliSec > b.milliSec) {
              return 1;
            }
            if (a.milliSec < b.milliSec) {
              return -1;
            }
          }
          return 0;
        });

        obj.forEach((value, key) => {
          value.rank = index;
          index++;
        });
        //console.log(obj)
        req.topTenList = obj;
        next();
      }
    }).
    catch(err => {
      console.log(err);
    });
}

const levelBasedScore = (req, res, next) => {
  return models.Score.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: { user: "$user", level: "$level", scene: "$scene" }, "highScore": { "$max": "$score" } } },
    { $sort: { "_id.level": 1, "_id.scene": 1 } },
    {
      $lookup: {
        from: 'users',
        localField: '_id.user',
        foreignField: '_id',
        as: 'profile'
      }
    },
    { $unwind: "$profile" },

  ]).
    then(profile => {
      if (profile != null) {
        var profileArray = {};
        profile.forEach((list, index) => {
          var record = {
            level: list._id.level,
            scene: list._id.scene,
            score: list.highScore,
            name: list.profile.userName
          };
          if (list._id.level in profileArray) {
            profileArray[list._id.level].push(record)
          }
          else {
            profileArray[list._id.level] = [record];
          }
        })
        //console.log(profileArray);
        req.scoresByLevel = profileArray;
        next();
      }
    })
}

const getScoreByScene = (sceneId, userID) => {

  if (sceneId === '' && userID === '')
    console.log("invalid userid and sceneid");

  let result = {};
  return models.Score.aggregate([
    { $match: { $and: [{ level: config.level }, { scene: sceneId }, { user: userID }] } },
    { $group: { _id: null, "bestScore": { "$max": "$score" } } }
  ])
    .then((score) => {
      result = score;
      if (result == '') {
        return null;
      } else {
        return result;
      }
    }).
    catch(err => {
      return err;
    })
}

const getUserscore = userId => {
  return models.Score.findOne({ user: userId, level: config.level }).then(data => {
    if (data != null) {
      return data;
    } else {
      return null;
    }
  })
}

module.exports = {
  saveScore,
  getScore,
  getTopScore,
  levelBasedScore,
  getScoreByScene,
  getUserscore
}