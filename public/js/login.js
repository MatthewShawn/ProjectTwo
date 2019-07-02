const Top = Vue.component("Top", {
	template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header"></div>
    </div>
  </nav>
  `,
	data: {},
	methods: {}
});

const LogIn = Vue.component("LogIn", {
	template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h2>Login Form</h2>
          <form class="login" v-on:submit.prevent="logIn()">
            <div class="form-group">
              <label for="exampleInputEmail1">User Name</label>
              <input
                type="text"
                class="form-control"
                id="text-input"
                placeholder="User Name"
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
            <button type="submit" class="btn btn-default">Login</button>
          </form>
          <br />
          <p>Or sign up <a href="/">here</a></p>
        </div>
      </div>
    </div>
  `,
	data: {},
	methods: {
		logIn() {
			var textInput = $("input#text-input");
			var passwordInput = $("input#password-input");
			var userData = {
				text: textInput.val().trim(),
				password: passwordInput.val().trim()
			};
			if (!userData.text || !userData.password) {
				return;
			}
			// If we have an text and password we run the loginUser function and clear the form
			this.$root.loginUser(userData.text, userData.password);
			textInput.val("");
			passwordInput.val("");
		}
	}
});

const Vapp = new Vue({
	el: "#app",
	data: {},
	methods: {
		loginUser(text, password) {
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
	}
});
