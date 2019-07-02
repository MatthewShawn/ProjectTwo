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
        <form class="signup" v-on:submit.prevent="signUp">
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
	methods: {
		signUp() {
			var textInput = $("input#text-input");
			var passwordInput = $("input#password-input");
			var userData = {
				text: textInput.val().trim(),
				password: passwordInput.val().trim()
			};

			if (!userData.text || !userData.password) {
				return;
			}
			// If we have an text and password, run the signUpUser function
			this.$root.signUpUser(userData.text, userData.password);
			textInput.val("");
			passwordInput.val("");
		}
	}
});

const Vapp = new Vue({
	el: "#app",
	data: {},
	methods: {
		signUpUser(text, password) {
			$.post("/api/signup", {
				text: text,
				password: password
			})
				.then(function(data) {
					window.location.replace("/members");
					// If there's an error, handle it by throwing up a bootstrap alert
				})
				.catch(this.handleLoginErr);
		},
		handleLoginErr(err) {
			$("#alert .msg").text(err.responseJSON);
			$("#alert").fadeIn(500);
		}
	}
});
