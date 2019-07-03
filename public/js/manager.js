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
  template: ` 
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <form>
            <div class="form-group">
              <label for="employeeForm">Employee Name</label>
              <input
                type="text"
                class="form-control"
                id="employee-name"
                placeholder="Enter employee"
              ></input>
            </div>
            <button id="submit" type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
          <h2>
            Your employee is <span class="found-employee"></span>
          </h2>
          <h2>
            Welcome <span class="member-name"></span>
          </h2>
          <h2>
            Member Salary <span class="member-salary"></span>
          </h2>
          <h2>
            Member Score <span class="member-score"></span>
          </h2>
          <h2>
            Is Manager: <span class="member-manager"></span>
          </h2>
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
    $(".member-manager").text(data.userData.is_manager);
  });

  // If we have an text and password we run the loginUser function and clear the form
  $("form").submit(function(event) {
    alert("Submitted");
    event.preventDefault();
    var textInput = $("#employee-name");
    var employeeData = {
      text: textInput.val().trim()
    };
    $.get("/api/employees/:id").then(function(data) {
      $(".found-employee").text(data.employeeData.id);
    });
  });
});
