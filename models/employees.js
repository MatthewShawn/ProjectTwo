// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
    var Employees = sequelize.define("Employees", {
        freezeTableName: true,
        // The email cannot be null, and must be a proper email before creation
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        avg_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        is_manager: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            len: [1]
        }
    });

    Employees.associate = function(models) {
        // We're saying that an Employee should belong to a Role, and that
        // other Employees can have the same Role definition.


        Employees.belongsTo(models.Roles, {
            foreignKey: "id",
            as: "job_role",
            allowNull: false
        });

        // An Employee can have many Emp_skills.
        Employees.hasMany(models.Emp_skills, {
            //onDelete: "cascade"
        });

    };
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Employees.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Employees.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return Employees;
};
