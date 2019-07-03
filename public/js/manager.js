const Top = Vue.component("Top", {
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/logout">
            Logout
          </a>
        </div>
      </div>
    </nav>
    `,
  data: {},
  methods: {}
});

const Welcome = Vue.component("Welcome", {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h2>Welcome <span class="member-name"></span></h2>
          <h2>Member Salary <span class="member-salary"></span></h2>
          <h2>Member Score <span class="member-score"></span></h2>
          <h2>Is Manager: <span class="member-manager"></span></h2>
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
//--------------------------- Refactor this to Vue methods ---------------
$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/employees_data").then(function(data) {
    $(".member-name").text(data.userData.text);
    $(".member-salary").text(data.userData.salary);
    $(".member-score").text(data.userData.avg_score);
    $(".member-manager").text(data.userData.is_manager);
  });
});
