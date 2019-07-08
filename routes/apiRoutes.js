var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
	// Using the passport.authenticate middleware with our local strategy.
	// If the employees has valid login credentials, send them to the members page.
	// Otherwise the employees will be sent an error
	app.post("/api/login", passport.authenticate("local"), function(req, res) {
		if (req.user) {
			console.log(req.user);
		}
		res.json(req.user);
	});

	// Route for signing up a employees. The employees's password is automatically hashed and stored securely thanks to
	// how we configured our Sequelize employees Model. If the employees is created successfully, proceed to log the employees in,
	// otherwise send back an error
	app.post("/api/signup", function(req, res) {
		db.Employees.create({
			text: req.body.text,
			password: req.body.password
		})
			.then(function() {
				res.redirect(307, "/api/login");
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// find all the skill_data table entries
	app.get("/api/skill_crap", function(req, res) {
		console.log("Found the api/skill_crap api route.");
		db.Skill_crap.findAll({}).then(function(dbSkill_crap) {
			res.json(dbSkill_crap);
		});
	});

	// Get the list of skill_data rows from a role_id via
	// the job_skills.  a.k.a.  a join.
	// this is not working....abandoning due to time
	app.get("/api/role_skill_crap/:role_id", function(req, res) {
		console.log("Found the api/skill_crap/role/:role_id api route.");
		db.Job_skills.findAll({
			where: {
				role_id: req.params.role_id
			},
			include: db.Skill_crap
		})
			.then(function(dbJob_skills) {
				console.log(dbJob_skills);
				//   var dbSkill_crap;
				//   dbJob_skills.forEach(job_skills_row => {
				//      db.Skill_crap.findOne({
				//          where: {
				//              id: job_skills_row.skill_crap_id
				//         }
				//     }).then(function(dbSkill_crap_row) {
				//         dbSkill_crap.push(dbSkill_crap_row);
				//    });
				// });
				// res.json(dbSkill_crap);
				res.json(dbJob_skills);
			})
			.then(function() {
				res.redirect(307, "/api/login");
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// Get the list of skill_data rows from an empolyees_id + reviewer_id via
	// the job_skills.  a.k.a.  a join.
	// this is not working....abandoning due to time...
	app.get("/api/emp_skill_crap/:emp_id/:rev_id", function(req, res) {
		db.Emp_skills.findAll({
			where: {
				employees_id: req.params.emp_id,
				reviewer_id: req.params.rev_id
			},
			include: db.Skill_crap
		}).then(function(dbEmp_skills) {
			//var dbSkill_crap;
			//dbEmp_skills.forEach(emp_skills_row => {
			// db.Skill_crap.findOne({
			//   where: {
			//     id: emp_skills_row.skill_crap_id
			//  }
			// }).then(function(dbSkill_crap_row) {
			//    dbSkill_data.push(dbSkill_crap_row);
			// });
			//});
			//res.json(dbSkill_crap);

			res.json(dbEmp_skills);
		});
	});

	app.get("/api/skill_crap/:skill_id", function(req, res) {
		db.Skill_crap.findOne({
			where: {
				id: req.params.skill_id
			}
		}).then(function(dbSkill_crap) {
			res.json(dbSkill_crap);
		});
	});

	// Add and row to the skill_data table
	app.post("/api/skill_crap", function(req, res) {
		db.Skill_crap.create({
			d_title: req.body.d_title,
			d_desc: req.body.d_desc
		})
			.then(function(data) {
				res.json({ data });
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// find all the skill_data table entries
	app.get("/api/skill_crap", function(req, res) {
		console.log("Found the api/skill_crap api route.");
		db.Skill_crap.findAll({}).then(function(dbSkill_crap) {
			res.json(dbSkill_crap);
		});
	});

	// Add and row to the role table
	app.post("/api/role", function(req, res) {
		db.Role.create({
			r_title: req.body.r_title,
			salary_low: req.body.salary_low,
			salary_high: req.body.salary_high
		})
			.then(function(data) {
				res.json({ data });
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// Get the list of skill_data rows from an empolyees_id + reviewer_id via
	// the job_skills.  a.k.a.  a join.
	// this is not working....abandoning due to time...
	app.get("/api/emp_skill_crap/:emp_id/:rev_id", function(req, res) {
		db.Emp_skills.findAll({
			where: {
				employees_id: req.params.emp_id,
				reviewer_id: req.params.rev_id
			}
		}).then(function(dbEmp_skills) {
			//var dbSkill_crap;
			//dbEmp_skills.forEach(emp_skills_row => {
			// db.Skill_crap.findOne({
			//   where: {
			//     id: emp_skills_row.skill_crap_id
			//  }
			// }).then(function(dbSkill_crap_row) {
			//    dbSkill_data.push(dbSkill_crap_row);
			// });
			//});
			//res.json(dbSkill_crap);
			res.json(dbEmp_skills);
		});
	});

	// create and entry for job_skills
	// this will link a skill_data row to a role row
	app.post("/api/job_skills", function(req, res) {
		db.Job_skills.create({
			min_level_required: req.body.min_level_required,
			role_id: req.body.role_id,
			skill_crap_id: req.body.skill_crap_id
		})
			.then(function() {
				res.json({});
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// create and entry for emp_skills
	// this will link a skill_data row to an employees row
	app.post("/api/emp_skills", function(req, res) {
		db.Emp_skills.create({
			current_level: req.body.current_level,
			employees_id: req.body.employees_id,
			reviewer_id: req.body.reviewer_id,
			skill_crap_id: req.body.skill_crap_id
		})
			.then(function() {
				res.json({});
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// Add and row to the skill_data table
	app.post("/api/skill_crap", function(req, res) {
		db.Skill_crap.create({
			d_title: req.body.d_title,
			d_desc: req.body.d_desc
		})
			.then(function() {
				res.json({});
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// Add and row to the role table
	app.post("/api/role", function(req, res) {
		db.Role.create({
			r_title: req.body.r_title,
			salary_low: req.body.salary_low,
			salary_high: req.body.salary_high
		})
			.then(function() {
				res.json({});
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// create and entry for job_skills
	// this will link a skill_data row to a role row
	app.post("/api/job_skills", function(req, res) {
		db.Job_skills.create({
			min_level_required: req.body.min_level_required,
			role_id: req.body.role_id,
			skill_crap_id: req.body.skill_crap_id
		})
			.then(function() {
				res.json({});
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// create and entry for emp_skills
	// this will link a skill_data row to an employees row
	app.post("/api/emp_skills", function(req, res) {
		db.Emp_skills.create({
			current_level: req.body.current_level,
			employees_id: req.body.employees_id,
			reviewer_id: req.body.reviewer_id,
			skill_crap_id: req.body.skill_crap_id
		})
			.then(function() {
				res.json({});
			})
			.catch(function(err) {
				res.status(401).json(err);
			});
	});

	// Route for logging employees out
	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

	// Route for getting some data about our employees to be used client side
	app.get("/api/employees_data", function(req, res) {
		if (!req.user) {
			// The employee is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the employees's text and id
			// Sending back a password, even a hashed password, isn't a good idea
			res.json({
				userData: req.user
				// id: req.user.id,
			});
		}
	});

	//start skeleton ----------------- (using employee database)
	//get list of all employees
	app.get("/api/employees", function(req, res) {
		db.Employees.findAll({}).then(function(dbEmployees) {
			res.json(dbEmployees);
		});
	});

	//find one employee by specific id
	app.get("/api/employees/:id", function(req, res) {
		db.Employees.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbEmployees) {
			res.json(dbEmployees);
		});
	});

	// find all the role table entries
	app.get("/api/role", function(req, res) {
		db.Role.findAll({}).then(function(dbRole) {
			res.json(dbRole);
		});
	});

	// find role of employee
	app.get("/api/role/:id", function(req, res) {
		db.Role.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbEmployees) {
			res.json(dbEmployees);
		});
	});

	//find all employees with a specific job title.  (using the role table)
	app.get("/api/role/title/:r_title", function(req, res) {
		db.Role.findOne({
			where: {
				r_title: req.params.r_title
			}
		}).then(function(dbRole) {
			db.Employees.findAll({
				where: {
					role_id: dbRole.id
				}
			}).then(function(dbEmployees) {
				res.json(dbEmployees);
			});
		});
	});

	//add new employees object deconstructuring
	app.post("/api/employees", function(req, res) {
		var { e_name, pswd, salary, score, is_manager, job_role } = req.body;

		var newEmployee = {
			e_name,
			pswd,
			salary,
			score,
			is_manager,
			job_role
		};
		db.Employees.create(newEmployee).then(function(dbEmployees) {
			console.log(`New Employee added ${dbEmployees.e_name}`);
			res.json({
				id: dbEmployees.id
			});
		});
	});
	//delete employees
	app.delete("/api/employees/:id", function(req, res) {
		db.Employees.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbEmployees) {
			console.log(`Deleted Employee ${dbEmployees}`);
			res.json(dbEmployees);
		});
	});
	//update current employees
	app.put("/api/employees", function(req, res) {
		console.log("PUT REQUEST MADE");
		db.Employees.update(
			{
				// text: req.body.text,
				// //password: req.body.password,
				// salary: req.body.salary,
				// avg_score: req.body.avg_score,
				// is_manager: req.body.is_manager,
				role_id: req.body.role_id
			},
			{
				where: {
					id: req.body.id
				}
			}
		)
			.then(function(dbEmployees) {
				res.json(dbEmployees);
			})
			.catch(function(err) {
				res.json(err);
			});
	});
	//end skeleton ----------------zz
}; //end module.exports function
