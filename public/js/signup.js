const Top = Vue.component("Top", {
	template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header"></div>
      </div>
    </nav>
  `,
	methods: {},
	data: {}
});

const SignUp = Vue.component("SignUp", {
	template: `
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2>Sign Up Form</h2>
        <form class="signup">
          <div class="form-group">
            <label for="exampleInputEmail1">User Name</label>
            <input
              type="text"
              class="form-control"
              id="text-input"
              placeholder="Text"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="password-input"
              placeholder="Password"
            />
          </div>
          <div
            style="display: none"
            id="alert"
            class="alert alert-danger"
            role="alert"
          >
            <span
              class="glyphicon glyphicon-exclamation-sign"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Error:</span> <span class="msg"></span>
          </div>
          <button type="submit" class="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <a href="/login">here</a></p>
      </div>
    </div>
  </div>
  `,
	data: {},
	methods: {}
});

const Vapp = new Vue({
	el: "#app",
	data: {},
	methods: {}
});

//------------------- refactor this to Vue methods -----------------------
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
