"use strict";
const env = process.env.NODE_ENV;

const sceneList = [
  {
    "scene": 1,
    "title": "Sao Ching Cha",
    "srcPath": "scene1/",
    "startDate": env === 'production' ? "16/05/2018" : "01/05/2018",
    "isBonus": 0,
    "sceneImg": "../../src/img/Scene1.jpg",
    "cordinates": [
      {
        "ath": 80,
        "atv": 3.5,
        "scale": 0.08
      },
      {
        "ath": 105,
        "atv": -1,
        "scale": 0.1
      },
      {
        "ath": -50,
        "atv": -10,
        "scale": 0.15
      },
      {
        "ath": -145,
        "atv": 4,
        "scale": 0.12
      },
      {
        "ath": 133,
        "atv": -3,
        "scale": 0.1
      },
      {
        "ath": 160,
        "atv": 1,
        "scale": 0.11
      },
      {
        "ath": 190,
        "atv": 1,
        "scale": 0.1
      },
      {
        "ath": 195,
        "atv": -6,
        "scale": 0.07
      },
      {
        "ath": 120,
        "atv": 1,
        "scale": 0.09
      },
      {
        "ath": -120,
        "atv": 1,
        "scale": 0.08
      }
    ]
  },
  {
    "scene": 2,
    "title": "Wat Yannawa",
    "srcPath": "scene2/",
    "startDate": env === 'production' ? "18/05/2018" : "01/05/2018",
    "isBonus": 0,
    "sceneImg": "../../src/img/Scene2.jpg",
    "cordinates": [
      {
        "ath": -5,
        "atv": 12,
        "scale": 0.1
      },
      {
        "ath": 100,
        "atv": 12,
        "scale": 0.1
      },
      {
        "ath": 150,
        "atv": 20,
        "scale": 0.1
      },
      {
        "ath": 170,
        "atv": 15,
        "scale": 0.1
      },
      {
        "ath": 200,
        "atv": 13,
        "scale": 0.1
      },
      {
        "ath": 240,
        "atv": -15,
        "scale": 0.1
      },
      {
        "ath": 282,
        "atv": -10.5,
        "scale": 0.1
      },
      {
        "ath": 320,
        "atv": 20,
        "scale": 0.1
      },
      {
        "ath": 310,
        "atv": -8,
        "scale": 0.1
      },
      {
        "ath": 120,
        "atv": 10,
        "scale": 0.1
      },
    ]
  },
  {
    "scene": 3,
    "title": "Wat Pho Circle",
    "srcPath": "scene3/",
    "startDate": env === 'production' ? "21/05/2018" : "01/05/2018",
    "isBonus": 1,
    "sceneImg": "../../src/img/Scene3.jpg",
    "cordinates": [
      {
        "ath": 33,
        "atv": 18,
        "scale": 0.09
      },
      {
        "ath": 54,
        "atv": 18,
        "scale": 0.07
      },
      {
        "ath": 85,
        "atv": 16,
        "scale": 0.07
      },
      {
        "ath": 125,
        "atv": 16,
        "scale": 0.09
      },
      {
        "ath": 150.5,
        "atv": 10,
        "scale": 0.06
      },
      {
        "ath": -130,
        "atv": 3,
        "scale": 0.09
      },
      {
        "ath": -105,
        "atv": 15,
        "scale": 0.08
      },
      {
        "ath": -85,
        "atv": 15,
        "scale": 0.08
      },
      {
        "ath": -60,
        "atv": 16.5,
        "scale": 0.06
      },
      {
        "ath": -15,
        "atv": 15,
        "scale": 0.09
      },
    ]
  },
  {
    "scene": 4,
    "title": "Mahanakhon Building",
    "srcPath": "scene4/",
    "startDate": env === 'production' ? "24/05/2018" : "01/05/2018",
    "isBonus": 1,
    "sceneImg": "../../src/img/Scene4.jpg",
    "cordinates": [
      {
        "ath": -53,
        "atv": 30,
        "scale": 0.09
      },
      {
        "ath": 63.5,
        "atv": 15.5,
        "scale": 0.06
      },
      {
        "ath": 85,
        "atv": 16,
        "scale": 0.07
      },
      {
        "ath": 108.5,
        "atv": 34.5,
        "scale": 0.06
      },
      {
        "ath": 150.5,
        "atv": 21,
        "scale": 0.07
      },
      {
        "ath": -173.5,
        "atv": 19.5,
        "scale": 0.07
      },
      {
        "ath": -130,
        "atv": 36.5,
        "scale": 0.06
      },
      {
        "ath": -85,
        "atv": 15,
        "scale": 0.08
      },
      {
        "ath": -60,
        "atv": 16.5,
        "scale": 0.06
      },
      {
        "ath": 196,
        "atv": 33,
        "scale": 0.06
      }
    ]
  }
];

const level = {
  level: 1
};

module.exports = {
  level,
  sceneList
}