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

const survey = Vue.component("survey", {
  template: `
		<div class="row">
			<div class="col-md-6 offset-md-3">
				<form id="review">
                    <h1 id="p-name"></h1>
                    <div id="member-name"></div>
                    <div id="skill-name"></div>
                    <div id="skill-desc"></div>
                    <div id="add-commments"></div>
					<div class="form-group">
                        <div class="form-group">
                        <label for="category">This will be dynamically created skills 1-10</label>
                        <select class="custom-select" id="author">
                      </select>
                    </div>
                    <div>dynamically created text descriptions</div>
                    <br />
						<label for="comments">Comments:</label>
						<textarea placeholder="Any additional feedback" class="form-control" rows="10" id="comments"></textarea>
						<br />
						<button type="submit" class="btn btn-success submit">Submit</button>
					</div>
				</form>
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

$(document).ready(function() {
  var pathname = window.location.href;
  var url_array = pathname.split("="); // Split the string into an array with / as separator
  var employeeID = url_array[url_array.length - 1]; // Get the last part of the array (-1)
  alert(employeeID); // Alert last segment

  function getEmployeeName(employee) {
    $.get("/api/employees/" + employee).then(function(data) {
      $("#member-name").text(data.text);
    });
  }

  getEmployeeName(employeeID);

  //   function displayp(pData) {
  //     var p = $("<p>");
  //     p.data("p", pData); //could be employee(s)
  //     p.append(pData.text);
  //     if (pData.role) {
  //       p.append(`<p>${pData.Role.length}</p>`);
  //     } else {
  //       p.append(`<p>No Role Assigned</p>`);
  //     }
  //     return p;
  //   }

  //   displayp();
});
