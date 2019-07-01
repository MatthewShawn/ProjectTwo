/* eslint-disable no-unused-vars */
Vue.component("LoginForm", {
  template: `
    <div>
      <label for='username'>username:</label>
      <input id='username' name='username' type='text'>
      <label for='password'>password:</label>
      <input id='password' name='password' type='password'>
      <button id='submit' v-on:click='login($event)'>login</button>
      <br>
      <a href='/signup'>don't have an account? sign up here!</a>
    </div>
    `,
  methods: {
    login(e) {
      e.preventDefault();
      $("input").val("");
      this.$root.login();
    }
  }
});

const vueApp = new Vue({
  el: "#app",
  data: {
    display: "this is a login page"
  },
  methods: {
    login() {
      this.display = "you've clicked login";
    }
  }
});
