
export default {
  init() {
    console.log("Scenes Page");
    $('.browserBack').click(function(){
      parent.history.back();
      return false;
    });
  },
}