var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username and password
passport.use(
  new LocalStrategy(
    // Our user will sign in with a "username"
    {
      usernameField: "user name"
    },
    function(userName, password, done) {
      // When a user tries to sign in this code runs
      db.Employees.findOne({
        where: {
          text: text
        }
      }).then(function(dbEmployees) {
        // If there's no user with the given user name
        if (!dbEmployees) {
          return done(null, false, {
            message: "Incorrect userName."
          });
        }
        // If there is a user with the given user name, but the password the user gives us is incorrect
        else if (!dbEmployees.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbEmployees);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
