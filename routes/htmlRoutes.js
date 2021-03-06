// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.text) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.text) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/manager", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/manager.html"));
  });

  app.get("/survey", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/jobPost", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/jobPost.html"));
  });

};