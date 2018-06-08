import popupTools from 'popup-tools';
import browser from './detect';

export default {
  init() {
    if (browser.isWeChat()) {
      $("#connectFB").hide();
      $("#wechatButton").show();
    }
    else {
      $("#connectFB").show();
      $("#wechatButton").hide();
    }

    //Popup
    $('.howtoPlayPopupTrigger').on('click', function (event) {
      event.preventDefault();
      $('.howtoPlayPopup').fadeIn(800);
      setTimeout(function () {
        $('.howtoPlayPopup').addClass('visible');
      }, 1000);
    })
    $('.popupClose').on('click', function () {
      $('.howtoPlayPopup').fadeOut(800).removeClass('visible');
    })

    $('.cancelButton').on('click', function () {
      $('.dialog-fb').hide();
    })

  },

  fbconnect: function () {

    if (location.href.indexOf("totalquartz360.com") >= 0) {
      gtag('event', 'click', { 'event_category': 'button', 'event_label': 'Login With Facebook', 'value': 'Login With Facebook' });
    }

    popupTools.popup('/fblogin', 'Facebook Login', { width: 500, height: 500 }, function (err, data) {
      if (data) {
        if (data.jwttoken) localStorage.setItem('jwtToken', data.jwttoken);
        window.location = '/scenes';
      } else {
        var error = err.toString();
        if (error.indexOf('Popup closed') >= 0) {
          $('.dialog-fb').show();
        }
      }
    });
  }
};