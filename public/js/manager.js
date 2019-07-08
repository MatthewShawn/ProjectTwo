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
			<div class="col-md-1"></div>
			<div class="container">
        <div class="col-md-10">
        <h1 style="text-align:center;">Employee Info</h1>
        <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit Role Info</th>
						<th>Review</th>
						<th>Salary</th>
						<th>Score</th>
						<th>Apply</th>
						<th>Delete</th>
          </tr>
          </thead>
          <tbody>

          </tbody>
          </table>
					<div class="col-md-1"></div>
					</div>
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
	let employeeNameInput = $("#employee-name");
	let employeeList = $("tbody");
	let employeeContainer = $(".employee-container");
	let employeeRole = $("#employee-role");
	let employeeSalary = $("#employee-salary");
	let employeeScore = $("#employee-score");
	//adding event listeners
	$(document).on("submit", "#employee-form", handleEmployeeFormSubmit);
	$(document).on("click", ".delete-employee", handleDeleteButtonPress);
	$(document).on("click", ".apply-changes", handleApplyChanges);
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
	function createEmployeeRow(employeeData, roles) {
		let optionsArray = [];
		for (let i = 0; i < roles.length; i++) {
			optionsArray.push(
				`<option value=${roles[i].id}>${roles[i].r_title}</option>`
			);
		}
		var newTr = $("<tr>");
		newTr.data("employees", employeeData); //could be employee(s)
		newTr.append(`<td>${employeeData.text}</td>`);
		if (employeeData.Employees) {
			newTr.append(`<td>${employeeData.Employees.length}</td>`);
		} else {
			newTr.append(
				`<td><select id="first-choice">
			<option selected value="base">Please Select</option>` + optionsArray.toString()
			);
			newTr.append("</select></td>");
		}
		newTr.append(
			"<td><a href='/survey?employee_id=" +
				employeeData.id +
				"'>Create a Review</a></td>"
		);
		newTr.data("employees", employeeData);
		newTr.append(`<td>${employeeData.salary}</td>`);
		newTr.data("employees", employeeData);
		newTr.append(`<td>${employeeData.avg_score}</td>`);
		newTr.append(
			"<td><a style='cursor:pointer;color:green' class='apply-changes'>Apply</a></td>"
		); //still need to add button in div
		newTr.append(
			"<td><a style='cursor:pointer;color:red' class='delete-employee'>Delete</a></td>"
		); //still need to add button in div

		return newTr;
	}

	//retrieve employees
	function getEmployees() {
		let empData;
		let rowsToAdd = [];
		$.get("api/employees", function(data) {
			empData = data;
		}).then(function(empData) {
			$.get("api/role", function(roles) {
				for (var i = 0; i < empData.length; i++) {
					rowsToAdd.push(createEmployeeRow(empData[i], roles));
				}
				renderEmployeeList(rowsToAdd);
				employeeNameInput.val("");
			});
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

	function handleApplyChanges(post) {
		let thisRole = $(this)
			.parent("td")
			.parent("tr")
			.children("td")
			.children("select")
			.find(":selected")
			.attr("value");
		let listItemData = $(this)
			.parent("td")
			.parent("tr")
			.data("employees");
		let id = listItemData.id;
		$.ajax({
			method: "PUT",
			url: "/api/employees",
			data: {
				id: id,
				role_id: thisRole
			}
		}).then(function(err) {
			console.log(err);
		});
	}
});
