$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function logged() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
      console.log(data.email);
      //$("#menutournaments").hide;
      if (data.email) {
        $("#menulogin").text(data.email);
        return true;
        //window.location.href = "/tournaments";
      }
    });
  }

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function (data) {
      var islogged = true;
      if (islogged) {
        window.location.href = "/tours";
      }
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
      $("#loginerror").text(err.responseText);
      //window.location.href = "/tours";
    });
  }

});