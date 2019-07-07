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
      <a class="navbar-brand" href="/jobPost">
      Jobs
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
    <div class="employee-container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
        <h1>Employee Info</h1>
        <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit Role Info</th>
						<th>Review</th>
						<th>Salary</th>
						<th>Score</th>
						<th>Delete</th>
          </tr>
          </thead>
          <tbody>

          </tbody>
          </table>
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
	let employeeRole = $("#employee-role");
	let employeeSalary = $("#employee-salary");
	let employeeScore = $("#employee-score");
	//adding event listeners
	$(document).on("submit", "#employee-form", handleEmployeeFormSubmit);
	$(document).on("click", ".delete-employee", handleDeleteButtonPress);
	//listing all employees
	getEmployees();
	//function when form is submitted.
	function handleEmployeeFormSubmit(event) {
		event.preventDefault();

		if (
			!employeeNameInput
			.val()
			.trim()
			.trim()
		) {
			return;
		}
		upsertEmployee({
			text: employeeNameInput.val().trim()
		});
	}

	//function for creating employee
	function upsertEmployee(employeeData) {
		$.post("/api/employees", employeeData).then(getEmployees);
	}

	//new list row for employees
	function createEmployeeRow(employeeData) {
		var newTr = $("<tr>");
		newTr.data("employees", employeeData); //could be employee(s)
		newTr.append(`<td>${employeeData.text}</td>`);
		if (employeeData.Employees) {
			newTr.append(`<td>${employeeData.Employees.length}</td>`);
		} else {
			newTr.append(`<td><select id="first-choice">
			<option selected value="base">Please Select</option>
			<option value="Biggie">Biggie</option>
			<option value="Little Biggie">Little Biggie</option>
			</select></td>`);
		}
		newTr.append(
			"<td><a href='/survey?employee_id=" +
			employeeData.id +
			"'>Create a Review</a></td>"
		);
		newTr.data("employees", employeeData);
		newTr.append(
			`<td>${employeeData.salary}</td>`
		)
		newTr.data("employees", employeeData)
		newTr.append(
			`<td>${employeeData.avg_score}</td>`
		)
		newTr.append("<td>X</td>"); //still need to add button in div
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
		employeeList
			.children()
			.not(":last")
			.remove();
		employeeContainer.children(".alert").remove();
		if (rows.length) {
			console.log(rows);
			employeeList.prepend(rows);
		} else {
			renderEmpty();
		}
	}

	function handleDeleteButtonPress() {
		let listItemData = $(this)
			.parent("td")
			.parent("tr")
			.data("employees");
		let id = listItemData.id;
		$.ajax({
			method: "DELETE",
			url: "/api/employees/" + id
		}).then(getEmployees);
	}
}); <
svg xmlns = "http://www.w3.org/2000/svg"
width = "12"
height = "16"
viewBox = "0 0 12 16" > < path fill - rule = "evenodd"
d = "M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z" / > < /svg>