import parsley from "parsleyjs";
export default {
  init() {
    $(".afterSubmit").hide();
    var userForm = $('#updateUser');
    if (typeof localStorage.refLevel != "undefined" && localStorage.refLevel != '') {
      var inputLevel = document.createElement("input");
      inputLevel.type = "hidden";
      inputLevel.name = "refLevel";
      inputLevel.value = localStorage.refLevel;
      userForm.append(inputLevel);
    }
    if (typeof localStorage.refBy != "undefined" && localStorage.refBy != '') {
      var inputrefBy = document.createElement("input");
      inputrefBy.type = "hidden";
      inputrefBy.name = "refBy";
      inputrefBy.value = localStorage.refBy;
      userForm.append(inputrefBy);
    }
    this.formHandler(userForm);
  },
  formHandler: function (userForm) {
    var _this = this;
    userForm.parsley();
    $(userForm).on('submit', function (e) {
      e.preventDefault();
      if (location.href.indexOf("totalquartz360.com") >= 0) ga('event', 'click', { 'event_category': 'button', 'event_label': 'Registration Confirmation', 'value': 'Registration Confirmation' });
      var disabled = $(this).find(':input:disabled').removeAttr('disabled');
      var serialized = $(this).serialize();
      _this.submitForm(serialized);
    });
  },
  submitForm: function (data) {
    localStorage.removeItem("refLevel");
    localStorage.removeItem("refBy");
    axios({
      url: "/updateUser",
      method: "post",
      data: data,
      headers: { "Authorization": "bearer " + localStorage.jwtToken }
    })
      .then(function (data) {
        var obj = JSON.stringify(data);
        if (obj.err != 1) {
          window.location.reload();
        }
      })
      .catch(function (error) {
        if (error.response) {
          $('#serverError').html("");
          $('#serverError').html(error.response.data.message).show();
          setTimeout(() => {
            $('#serverError').html("").hide();
          }, 2000);
        }
      });
  }

}
