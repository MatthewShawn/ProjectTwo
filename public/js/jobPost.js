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

const JobPost = Vue.component("JobPost", {
	template: `
      <form class="container" v-on:submit.prevent="postJobSkills()">
        <div class="form-row">
        <div class="col-auto">
        <label class="col-form-label" for="job-title">Job Title</label>
        </div>
        <div class="col-auto">
              <input type="text" class="form-control" id="job-title">
        </div>
        <div class="col-auto">
              <label class="col-form-label">Salary Range</label>
        </div>
        <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">  
                  <span class="input-group-text">Low $</span>
                </div>
                <input type="number" class="form-control" id="salary-low">
              </div>
        </div>
        <div class="col">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">High $</span>
                </div>
                <input type="number" class="form-control" id="salary-high">
              </div>
        </div>  
        </div>
        <div id="skills">
        </div>
        <small id="add-skill" v-on:click="addSkill()">+ add a skill</small>
        <hr/>
        <button type="submit" class="btn btn-primary">Submit</button>

      </form>
    `,
	data: {},
	methods: {
		addSkill() {
			let skillInput = `
      <div class="form-row pb-2 pt-2">
      <div class="col">
      <label>Skill</label>
      <input class="form-control s-title">
      </div>
      <div class="col-7">
      <label>Description</label>
      <input class="form-control s-desc">
      </div>
      <div class="col-2">
      <label>Min Proficiency (1-10)</label>
      <input class="form-control" type="number" id="prereq">
      </div>
      </div>
      `;
			$("#skills").append(skillInput);
		},
		postJobSkills() {
			let sTitles = [];
			let sDescs = [];
			let rTitle = $("#job-title").val();
			let lowRange = $("#salary-low").val();
			let highRange = $("#salary-high").val();
			let minLevelRequired = $("#prereq").val();
			$(".s-title").each(function () {
				sTitles.push($(this).val());
			});
			$(".s-desc").each(function () {
				sDescs.push($(this).val());
			});
			this.$root.doEverything(
				sTitles,
				sDescs,
				rTitle,
				lowRange,
				highRange,
				minLevelRequired
			);
		}
	}
});

const Vapp = new Vue({
	el: "#app",
	data: {},
	methods: {
		doEverything(
			sTitles,
			sDescs,
			rTitle,
			lowRange,
			highRange,
			minLevelRequired
		) {
			$.post("/api/role", {
				r_title: rTitle,
				salary_low: lowRange,
				salary_high: highRange
			}).then(function (dat) {
				let roleId = dat.data.id;
				console.log("roleId = ", roleId);
				console.log("sTitles = ", sTitles);
				console.log("sDescs = ", sDescs);
				for (let i in sTitles) {
					$.post("/api/skill_crap", {
						d_title: sTitles[i],
						d_desc: sDescs[i]
					}).then(function (data) {
						let skillCrapId = data.data.id;
						console.log("skillCrapId = ", skillCrapId);
						$.post("/api/job_skills", {
							min_level_required: minLevelRequired,
							role_id: roleId,
							skill_crap_id: skillCrapId
						}).then(function () {
							window.location.href = "/jobPost";
						})
					});
				}
			});
		}
	}
});

// app.post("/api/skill_crap", function(req, res) {
//   db.Skill_crap.create({
//     d_title: req.body.d_title,
//     d_desc: req.body.d_desc
//   })
//     .then(function() {
//       res.json({});
//     })
//     .catch(function(err) {
//       res.status(401).json(err);
//     });
// });

// app.post("/api/role", function(req, res) {
//   db.Role.create({
//     r_title: req.body.r_title,
//     salary_low: req.body.salary_low,
//     salary_high: req.body.salary_high
//   })
//     .then(function() {
//       res.json({});
//     })
//     .catch(function(err) {
//       res.status(401).json(err);
//     });
// });

// app.post("/api/job_skills", function(req, res) {
//   db.Job_skills.create({
//     min_level_required: req.body.min_level_required,
//     role_id: req.body.role_id,
//     skill_crap_id: req.body.skill_crap_id
//   })
//     .then(function() {
//       res.json({});
//     })
//     .catch(function(err) {
//       res.status(401).json(err);
//     });
// });