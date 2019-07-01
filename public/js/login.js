$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var textInput = $("input#text-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an text and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      text: textInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.text || !userData.password) {
      return;
    }

    // If we have an text and password we run the loginUser function and clear the form
    loginUser(userData.text, userData.password);
    textInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(text, password) {
    $.post("/api/login", {
      text: text,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
