export default {
  init() {
    console.log("profile page");
    $(".list ul:first").css("display", "block");
    $('.levelHead').on('click', function () {
      $('.levelHead').removeClass('active');
      $(this).addClass('active');
      $('.list ul').stop().slideUp(500);
      $(this).next('ul').stop().slideDown(500);
    });
  }
}