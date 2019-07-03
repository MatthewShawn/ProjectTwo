const Top = Vue.component("Top", {
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="/logout">
            Logout
          </a>
          <a class="navbar-brand" href="/manager">
          Manager
        </a>
        <a class="navbar-brand" href="/members">
        Member
      </a>
        </div>
      </div>
    </nav>
    `,
  data: {},
  methods: {}
});

const Welcome = Vue.component("Welcome", {
  template: 
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
        <form>
  <div class="form-group">
    <label for="employeeForm">Employee Name</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
          <h2>Welcome <span class="member-name"></span></h2>
          <h2>Member Salary <span class="member-salary"></span></h2>
          <h2>Member Score <span class="member-score"></span></h2>
          <h2>Is Manager: <span class="member-manager"></span></h2>
        </div>
      </div>
    </div>
    ,
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
