'use strict';
const models = require('../models');
const fs = require('fs');
const config = require('../config');

//get all label strings
function getlabelStrings() {
    const strings = {};
    for (let lang of config.lang) {
        strings[lang] = require(`../../public/locales/${lang}.json`);
    }
    return strings;
}

function getLabelsArray() {
    let labels = getlabelStrings();
    let langCode = config.default_lang;
    return labels[langCode];
}


module.exports = {
    getlabelStrings,
    getLabelsArray
}