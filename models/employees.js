// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Employees = sequelize.define(
    "Employees",
    {
      // The email cannot be null, and must be a proper email before creation
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true //need to fix unique. ----------------- IS NOT WORKING -------------------------------
      },
      // The password cannot be null
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      avg_score: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_manager: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      freezeTableName: true,
      underscored: true
    }
  );

  Employees.associate = function(models) {
    // We're saying that an Employee should belong to a Role, and that
    // other Employees can have the same Role definition.

    Employees.belongsTo(models.Role, {
      foreignKey: "id",
      as: "role_id",
      allowNull: false
    });

    // An Employee can have many Emp_skills.
    Employees.hasMany(models.Emp_skills, {
      //onDelete: "cascade"
    });
  };
  // Creating a custom method for our Employees model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Employees.prototype.validPassword = function(password) {
    var testB = bcrypt.compareSync(password, this.password);
    console.log(`Password returns: ${testB}`);
    return testB;
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Employees.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Employees;
};
