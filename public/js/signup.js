$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var textInput = $("input#text-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the text and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      text: textInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.text || !userData.password) {
      return;
    }
    // If we have an text and password, run the signUpUser function
    signUpUser(userData.text, userData.password);
    textInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(text, password) {
    $.post("/api/signup", {
      text: text,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
