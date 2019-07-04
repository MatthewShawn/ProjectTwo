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
// needs a container around entire HTML template
    <div class="employee-container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
        <h1>Employee Info</h1>
        <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit Role Info</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
            <tr id="form-row">
            <form id="employee-form">
            <td colspan="2">
            <input placeholder= "Enter employee name" id="employee-name" type="text"/>
            </td>
            <td><button type="submit" class="btn btn-success">Create employee</button>
            </td>
            </form>
            </tr>
          </tbody>
          </table>
          </div>
        </div>
      </div>


          // <form>
          //   <div class="form-group">
          //     <label for="employeeForm">Employee Name</label>
          //     <input
          //       type="text"
          //       class="form-control"
          //       id="employee-name"
          //       placeholder="Enter employee"
          //     ></input>
          //   </div>
          //   <button id="submit" type="submit" class="btn btn-primary">
          //     Submit
          //   </button>
          // </form>
          // <h2>
          //   Your employee is <span class="found-employee"></span>
          // </h2>
          // <h2>
          //   Welcome <span class="member-name"></span>
          // </h2>
          // <h2>
          //   Member Salary <span class="member-salary"></span>
          // </h2>
          // <h2>
          //   Member Score <span class="member-score"></span>
          // </h2>
          // <h2>
          //   Is Manager: <span class="member-manager"></span>
          // </h2> 
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
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/employees_data").then(function (data) {
    $(".member-name").text(data.userData.text);
    // $(".member-salary").text(data.userData.salary);
    // $(".member-score").text(data.userData.avg_score);
    // $(".member-manager").text(data.userData.is_manager);
    // $(".member-manager").text(data.userData.is_manager);
  });
  //getting reference to name and employees
  let employeeNameInput = $("#employee-name");
  let employeeList = $("tbody");
  let employeeContainer = $(".employee-container");
  //adding event listeners
  $(document).on("submit", "#employee-form", handleEmployeeFormSubmit);
  $(document).on("click", ".delete-employee", handleDeleteButtonPress);
  //listing all employees
  getEmployees();
  //function when form is submitted.
  function handleEmployeeFormSubmit(event) {
    event.preventDefault();

    if (!employeeNameInput.val().trim().trim()) {
      return;
    }
    upsertEmployee({
      text: employeeNameInput
        .val()
        .trim()
    });
  }

  //function for creating employee
  function upsertEmployee(employeeData) {
    $.post("/api/employees", employeeData)
      .then(getEmployees);
  }

  //new list row for employees
  function createEmployeeRow(employeeData) {
    var newTr = $("<tr>");
    newTr.data("employees", employeeData); //could be employee(s)
    newTr.append(`<td>${employeeData.text}</td>`);
    if (employeeData.Employees) {
      newTr.append(`<td>${employeeData.Employees.length}</td>`);
    } else {
      newTr.append(`<td>No Role Assigned</td>`);
    }
    newTr.append("<td><a href='/manager?employee_id=" + employeeData.id + "'>Create a Review</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-employee'>Delete employee</a></td>"); //still need to add button in div
    return newTr;
  }

  //retrieve employees
  function getEmployees() {
    $.get("api/employees", function (data) {
      let rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createEmployeeRow(data[i]));
      }
      renderEmployeeList(rowsToAdd);
      employeeNameInput.val("");
    });
  }

  //rendering employees to the page
  function renderEmployeeList(rows) {
    employeeList.children().not(":last").remove();
    employeeContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      employeeList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  //handling what to render when there are no employees
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("No Employees");
    employeeContainer.append(alertDiv);
  }

  function handleDeleteButtonPress() {
    let listItemData = $(this).parent("td").parent("tr").data("employees");
    let id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/employees/" + id
    }).then(getEmployees);
  }

  // If we have an text and password we run the loginUser function and clear the form


  // $("form").submit(function (event) {
  // alert("Submitted");
  // event.preventDefault();
  // var textInput = $("#employee-name").val();
  // var employeeData = {
  //   text: textInput.val().trim()
  // };
  // $.get("/api/employees/:id").then(function (data) {
  //   $(".found-employee").text(data.employeeData.id);
  // });
  // });


});