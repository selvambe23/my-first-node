(function () {
  var BROWSER_TYPE_360, BROWSER_TYPE_ANDROID, BROWSER_TYPE_IE, BROWSER_TYPE_MAXTHON, BROWSER_TYPE_OPERA, BROWSER_TYPE_QQ, BROWSER_TYPE_UNKNOWN, BROWSER_TYPE_WECHAT, BrowserType, CurrLanguage, EMPTY_OBJ, IsAndroid, IsMobile, IsiOS, OsMainVersion, OsVersion, browserTypes, nav, typeReg1, typeReg2, ua, uaResult, win;

  BROWSER_TYPE_QQ = "qq";

  BROWSER_TYPE_WECHAT = "wechat";

  BROWSER_TYPE_ANDROID = "android";

  BROWSER_TYPE_IE = "id";

  BROWSER_TYPE_360 = "360";

  BROWSER_TYPE_MAXTHON = "maxthon";

  BROWSER_TYPE_OPERA = "opera";

  BROWSER_TYPE_UNKNOWN = "unknown";

  EMPTY_OBJ = {};

  win = window || EMPTY_OBJ;

  nav = win.navigator || EMPTY_OBJ;

  ua = String(nav.userAgent || "").toLowerCase();

  IsMobile = ua.indexOf('mobile') !== -1 || ua.indexOf('android') !== -1;

  CurrLanguage = nav.language || nav.browserLanguage || "";

  CurrLanguage = CurrLanguage.split("-")[0] || "en";

  IsAndroid = false;

  IsiOS = false;

  OsVersion = '';

  OsMainVersion = 0;

  uaResult = /android (\d+(?:\.\d+)+)/i.exec(ua) || /android (\d+(?:\.\d+)+)/i.exec(String(nav.platform || ""));

  if (uaResult) {
    IsAndroid = true;
    OsVersion = uaResult[1] || '';
    OsMainVersion = parseInt(OsVersion) || 0;
  }

  uaResult = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(ua);

  if (uaResult) {
    IsiOS = true;
    OsVersion = uaResult[2] || '';
    OsMainVersion = parseInt(OsVersion) || 0;
  }

  BrowserType = "unknown";

  typeReg1 = /mqqbrowser|sogou|qq|qzone|liebao|micromessenger|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|trident|miuibrowser/i;

  typeReg2 = /qqbrowser|chrome|safari|firefox|opr|oupeng|opera/i;

  browserTypes = typeReg1.exec(ua) || typeReg2.exec(ua);

  BrowserType = browserTypes ? browserTypes[0] : BROWSER_TYPE_UNKNOWN;

  if (BrowserType === 'micromessenger') {
    BrowserType = BROWSER_TYPE_WECHAT;
  } else if (BrowserType === 'qq') {
    BrowserType = BROWSER_TYPE_QQ;
  } else if (BrowserType === 'safari' && ua.match(/android.*applewebkit/)) {
    BrowserType = BROWSER_TYPE_ANDROID;
  } else if (BrowserType === 'trident') {
    BrowserType = BROWSER_TYPE_IE;
  } else if (BrowserType === '360 aphone') {
    BrowserType = BROWSER_TYPE_360;
  } else if (BrowserType === 'mxbrowser') {
    BrowserType = BROWSER_TYPE_MAXTHON;
  } else if (BrowserType === 'opr') {
    BrowserType = BROWSER_TYPE_OPERA;
  }

  module.exports = {
    IsAndroid: IsAndroid,
    IsiOS: IsiOS,
    OsVersion: OsVersion,
    OsMainVersion: OsMainVersion,
    BrowserType: BrowserType,
    isWeChat: function () {
      return BrowserType === BROWSER_TYPE_WECHAT;
    }
  };

}).call(this);