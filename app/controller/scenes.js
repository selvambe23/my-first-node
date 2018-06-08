const moment = require('moment');
const game = require('./game');
const score = require('./score');
let scenesList = {};
scenesList = game.sceneList;
function scenes(req, res) {
  var sceneDetail = [];
  var j = 0;
  for (let i in scenesList) {
    score.getScoreByScene(scenesList[i].scene, req.user._id).then((score) => {
      sceneDetail.push({
        ...scenesList[i],
        bestScore: (score == null) ? 0 : score[0].bestScore,
        'isactive': checkGameStatus(scenesList[i].startDate),
        'formatedDate': convertDate(scenesList[i].startDate),
      });
      j++;
      if (scenesList.length == j) {
        sceneDetail.sort(function (a, b) {
          return (a.scene < b.scene) ? -1 : 1;
        });
        res.render('front/scenes', {
          scenes: sceneDetail,
          locales: req.i18n
        });
      }
    }).catch(err => {
      console.log(err)
      j++;
      if (scenesList.length == j) {
        console.log(sceneDetail)
        res.render('front/scenes', {
          scenes: sceneDetail,
          locales: req.i18n
        });
      }
    })
  }
  /*return scenesList.map(
      sceneList => {
          var sceneDetail = {};
          score.getScoreByScene(sceneList.scene, req.user._id).then((score)=>{
              sceneDetail = score;
              if (score != null) {
                  return sceneDetail
              }
              else {                    
                  return sceneDetail = null;
              }
          }).catch(err =>{
              console.log(err)
          })
          console.log(score);

          return { ...sceneList, 
              'isactive': checkGameStatus(sceneList.startDate),
              'formatedDate': convertDate(sceneList.startDate), 
              'isPlayed': {} }
      }
  );*/
}

const getscene = (req) => {
  let sceneObj = scenesList[req.params.sceneId - 1];
  if (sceneObj) {
    if (checkGameStatus(sceneObj.startDate)) {
      var random = Math.round(Math.floor((Math.random() * 9)));
      var key = (req.cookies.corkey != null && req.cookies.corkey === random) ? Math.floor((Math.random() * 10) + 0) : random;
      req.cookies.corkey = key;
      req.sceneDetail = sceneObj;
      req.cordinates = sceneObj.cordinates[key];
      return true;
    }
    else {
      return false;
    }

  }
  else {
    return false;
  }
};

function checkGameStatus(date) {
  let singapore = moment.tz(moment().format(), "Asia/Singapore");
  let currDate = singapore.format('DD/MM/YYYY');
  let currTs = moment(currDate, "DD/MM/YYYY").valueOf();
  let startTs = moment(date, "DD/MM/YYYY").valueOf();
  return currTs >= startTs;
}

function convertDate(date) {
  return moment(date, 'DD/MM/YYYY').format('DD MMM');
}

module.exports = {
  scenes,
  getscene
};