localStorage.setItem("p", '{"password":"p"}');
$(document).ready(function () {
  $(document).keypress(function (ev) {
    if (ev.keyCode == 13) $("#send_button").click();
  });
  $("#login_username_id").change(function () {
    messageToggle(true);
  });
  $("#login_password_id").change(function () {
    messageToggle(true);
  });
  $("#send_button").click(function () {
    authenticate(
      document.getElementById("login_username_id").value,
      document.getElementById("login_password_id").value
    );
  });
});
function authenticate(userName, password) {
  var UserLabel = document.getElementById("after_login_label");
  var details = localStorage.getItem(userName);
  if (details != null) {
    var insertedPassword = details.split('"')[3];
    if (insertedPassword == password) {
      UserLabel.innerText = "Welcome, ";
      UserLabel.append(userName);
      UserLabel.hidden = false;
      document.getElementById("login_username_id").value = "";
      document.getElementById("login_password_id").value = "";
      updateSettings(false);
      document.getElementById("player").append(userName);
      showInContentByID("definitions");
    } else {
      messageToggle(false);
    }
  } else {
    messageToggle(false);
  }
}

function messageToggle(hide) {
  var message = document.getElementById("login_error_message");
  var register = document.getElementById("login_to_register");
  message.hidden = hide;
  register.hidden = hide;
}
