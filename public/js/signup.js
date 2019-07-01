/* eslint-disable no-unused-vars */
Vue.component("SignUpForm", {
  template: `
    <div>
      <label for='username'>username:</label>
      <input id='username' name='username' type='text'>
      <label for='password'>password:</label>
      <input id='password' name='password' type='password'>
      <button id='submit' v-on:click='signUp($event)'>sign up</button>
      <br>
      <a href='/'>already have an account? log in here!</a>
    </div>`,
  methods: {
    signUp(e) {
      e.preventDefault();
      $("input").val("");
      this.$root.signUp();
    }
  }
});

const vueApp = new Vue({
  el: "#app",
  data: {
    display: "this is a signup page"
  },
  methods: {
    signUp() {
      this.display = "you've clicked sign up";
    }
  }
});
