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
						<th>Current Role</th>
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
	function createEmployeeRow(employeeData, roles, score) {
		var newTr = $("<tr>");
		let roleId = employeeData.role_id;
		let roleName = "";
		let optionsArray = [];
		for (let i = 0; i < roles.length; i++) {
			//check which role the employee has
			if (roleId === roles[i].id) {
				roleName = roles[i].r_title;
			}
			optionsArray.push(
				`<option value=${roles[i].id}>${roles[i].r_title}</option>`
			);
		}
		newTr.data("employees", employeeData); //could be employee(s)
		newTr.append(`<td>${employeeData.text}</td>`);
		if (employeeData.Employees) {
			newTr.append(`<td>${employeeData.Employees.length}</td>`);
		} else {
			newTr.append(
				`<td><select id="first-choice">
			<option selected value="base">Please Select</option>` + optionsArray.toString()
			);
			newTr.append(`<td>${roleName}</td>`);
			console.log(roleName);
			newTr.append("</select></td>");
		}
		newTr.append(
			"<td><a href='/survey?employee_id=" +
				employeeData.id +
				"'>Create a Review</a></td>"
		);
		newTr.data("employees", employeeData);
		newTr.append(
			`<td><input value="${employeeData.salary}" type="text"></input></td>`
		);
		newTr.data("employees", employeeData);
		newTr.append(`<td class="score">${employeeData.avg_score}</td>`);
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
					rowsToAdd.push(
						createEmployeeRow(empData[i], roles, getScore(empData[i].id))
					);
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
			employeeList.prepend(rows);
		} else {
			renderEmpty();
		}
	}

	function getScore(id) {
		$.get("api/emp_skills/" + id, function(data) {
			let array = [];
			console.log("data", data);
			for (var i in data) {
				array.push(data[i].current_level);
			}
			console.log(array);
			var sum = array.reduce((a, b) => a + b, 0);

			var mean = sum / data.length;
			console.log(mean);
			return mean;
		});
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

	function handleApplyChanges() {
		let thisRole = $(this)
			.parent("td")
			.parent("tr")
			.children("td")
			.children("select")
			.find(":selected")
			.attr("value");
		let thisSalary = $(this)
			.parent("td")
			.parent("tr")
			.children("td")
			.children("input")
			.val();
		let listItemData = $(this)
			.parent("td")
			.parent("tr")
			.data("employees");
		let id = listItemData.id;
		let request = {};
		request.id = id;
		request.salary = parseInt(thisSalary);
		if (!(thisRole === "base")) {
			request.role_id = parseInt(thisRole);
		}
		console.log(request);
		$.ajax({
			method: "PUT",
			url: "/api/employees",
			data: request,
			success: function(result) {
				console.log(result);
				window.location.href = "/manager";
			}
		});
	}
});
