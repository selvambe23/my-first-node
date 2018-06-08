import Invite from "./invite";

export default {
  init: function() {
    $('#fbShare').on('click', function (e) {
      e.preventDefault();
      Invite.fbShare();
    })
    $('#twitterShare').on('click', function (e) {
      e.preventDefault();
      Invite.twitterShare();
    })
    $('#copyToClipboard').on('click', function (e) {
      e.preventDefault();
      Invite.copyToClipboard();
    })

  //Popup
  $('.sharepopupTrigger').on('click', function (event) {
    event.preventDefault();
    $('.sharefriendsPopup').fadeIn(400);
    setTimeout(function () {
      $('.sharefriendsPopup').addClass('visible');
    }, 1000);
  })
  $('.sharepopupClose').on('click', function () {
    $('.sharefriendsPopup').fadeOut(400).removeClass('visible');
  })   

    // $('.toolTip').on('click', function() {
    //   //e.stopPropagation();
    //   $(this).toggleClass('active');
    // })

    // $(document).on('click', function(e) {
    //   if($('.toolTip').hasClass('active')){
    //     $('.toolTip').removeClass('active');
    //   }
    // })
  }
}