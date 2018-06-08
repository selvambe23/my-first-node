import axios from "axios";
import Login from "./login";
import Scenes from "./scenes";
import Score from "./score";
import LeaderBoard from "./leaderboard";
import Profile from "./profile";
import Logout from "./logout";
import "./less/style.less";
window.axios = axios;
(function () {
  var path = location.pathname.split('/');
  if (location.pathname === '/' || path[1] == 'referral') {
    Login.init();
    $('#connectFB').on("click", function (e) {
      e.preventDefault;
      Login.fbconnect();
    })
    $('#fbRelogin').on("click", function (e) {
      e.preventDefault;
      $('.dialog-fb').hide();
      Login.fbconnect();
    });
  } else if (location.pathname === "/scenes" || location.pathname === "/scenes/") {
    Scenes.init();
  } else if (location.pathname === '/score' || location.pathname === '/score/') {
    Score.init();
  } else if (location.pathname === '/leaderboard' || location.pathname === '/leaderboard/') {
    LeaderBoard.init();
  } else if (location.pathname === '/profile' || location.pathname === '/profile/') {
    Profile.init();
  }
  else if (location.pathname === '/logout' || location.pathname === '/logout/') {
    Logout.init();
  }

  $('#leaderboardToolTip').on('click', function () {
    $(this).toggleClass('active');
  })

  $('.trackEvent').on('click', function () {
    var title = $(this).data('title');
    if (location.href.indexOf("totalquartz360.com") >= 0) {
      gtag('event', 'click', { 'event_category': 'button', 'event_label': title, 'value': title });
    }
    if (location.href.indexOf("total-oil-badminton-staging.kacdn.cn") >= 0) {
      _paq.push(['send', 'event', title, title]);
    }
  });

})()

