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
            <div class="col-md-10 col-md-offset-1">
            <h1 id="member-name">Employee: </h1>
            <h1 id="role-name">Role: </h1>
            <hr>
				<form id="review">
                    <div class="skill-container"></div>
						<label for="comments">Comments:</label>
						<textarea placeholder="Any additional feedback" class="form-control" rows="5" id="comments"></textarea>
						<br>
						<button type="submit" class="btn btn-success submit">Submit</button>
                </form>
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
  var roleID;
  var newDiv = $("<div>");
  var skillContainer = $(".skill-container");
  $(document).on("submit", "#review", handleReviewFormSubmit);

  function handleReviewFormSubmit(event) {
    event.preventDefault();

    if (!comments.val().trim()) {
      return;
    }
    addReview({
      text: comments.val().trim()
    });
  }

  function addReview(employeeData) {
    $.post("/api/employees", employeeData).then(getEmployees);
  }

  // display employee name for the review
  function getEmployeeName(employee) {
    $.get("/api/employees/" + employee).then(function(data) {
      $("#member-name").append(data.text);
      roleID = data.RoleId;
      console.log("=====================================================");
      console.log(roleID);
      console.log("=====================================================");
      getRoleName(roleID);
    });
  }

  // display role associated with employee
  function getRoleName(role) {
    $.get("/api/role/" + role).then(function(data) {
      if (data) {
        let roleTitle = data.r_title;
        $("#role-name").append(roleTitle);
        getSkills(roleID);
      } else {
        alert("Please assign a role");
      }
    });
  }

  //   retrieve skills
  function getSkills(role) {
    $.get("/api/role_skill_crap/" + role, function(data) {
      console.log("=====================================================");
      console.log(data);
      console.log("=====================================================");
      let skillsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        skillsToAdd.push(createSkillRow(data[i]));
      }
      skillContainer.append(skillsToAdd);
    });
  }

  function createSkillRow(roleData) {
    if (roleData.Skill_crap) {
      newDiv.data("Skill_crap", roleData);
      newDiv.append(`<h2>${roleData.Skill_crap.d_title}</h2>`);
      newDiv.append(`<h3>${roleData.Skill_crap.d_desc}</h3>`);
      newDiv.append(`<label for="rating">Lowest Score Needed: ${roleData.min_level_required}</label>
      <input type="text" class="form-control" id="rating" placeholder="Enter score 0-10">`);
    } else {
      newDiv.append(`<p>No Role Assigned</p>`);
    }
    newDiv.append("<br>");
    return newDiv;
  }
  getEmployeeName(employeeID);
});
