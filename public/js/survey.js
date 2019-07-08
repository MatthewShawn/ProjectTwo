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

						<br>
						<button type="submit" form="review" class="btn btn-success submit">Submit</button>
                </form>
			</div>
		</div>

    `,
  data: {},
  methods: {}
});
{
  /* <label for="comments">Comments:</label>
<textarea placeholder="Any additional feedback" class="form-control" rows="5" id="comments"></textarea> */
}
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
  var numForms;
  var reviewerID;
  var skillCrapIDArray = [];

  // once the form is properly filled out, the form will submit
  $(".submit").click(function(event) {
    event.preventDefault();
    for (var i = 0; i < numForms; i++) {
      addReview(
        $("#rating" + i)
          .val()
          .trim(),
        i
      );
    }
  });

  //on page load, generates the review of the employee
  function renderPage() {
    getEmployeeName(employeeID);
    getReviewerID();
  }

  // creates an object from the review and posts it to the database
  function addReview(reviewNum, skillCrapID) {
    if (reviewNum > 0 && reviewNum < 11 && !isNaN(reviewNum)) {
      console.log(reviewNum);
      var newSkillReview = {
        current_level: reviewNum,
        employees_id: employeeID,
        reviewer_id: reviewerID,
        skill_crap_id: skillCrapIDArray[skillCrapID]
      };
      console.log(newSkillReview);
      $.post("/api/emp_skills", newSkillReview).then(function(response) {
        // window.location.href = "/members";
      });
    } else {
      alert("Please fill all of the forms with numbers 1-10");
    }
  }

  // display employee name for the review
  function getEmployeeName(employee) {
    $.get("/api/employees/" + employee).then(function(data) {
      $("#member-name").append(data.text);
      roleID = data.RoleId;
      getRoleName(roleID);
    });
  }

  // gets the ID of the reviewer
  function getReviewerID() {
    $.get("/api/employees_data").then(function(data) {
      reviewerID = data.userData.id;
      alert(reviewerID);
      return reviewerID;
    });
  }

  // display role associated with employee
  function getRoleName(role) {
    $.get("/api/role/" + role).then(function(data) {
      if (data) {
        // displays the role of the user
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
      let skillsToAdd = [];
      numForms = data.length;
      for (var i = 0; i < data.length; i++) {
        skillsToAdd.push(createSkillRow(data[i], i));
      }
      skillContainer.append(skillsToAdd);
      console.log(skillsToAdd);
    });
  }

  // dynamically displays the content of the page
  function createSkillRow(roleData, num) {
    if (roleData.Skill_crap) {
      //pushes the skill id into an array for later
      skillCrapIDArray.push(roleData.Skill_crap.id);
      newDiv.data("Skill_crap", roleData);
      newDiv.append(`<h2>${roleData.Skill_crap.d_title}</h2>`);
      newDiv.append(`<h3>${roleData.Skill_crap.d_desc}</h3>`);
      newDiv.append(`<label for="rating">Lowest Score Needed: ${roleData.min_level_required}</label>
      <input type="text" class="form-control" id="rating${num}" placeholder="Enter score 1-10">`);
    } else {
      newDiv.append(`<p>No Role Assigned</p>`);
    }
    newDiv.append("<br>");
    return newDiv;
  }

  renderPage();
});
