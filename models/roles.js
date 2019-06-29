module.exports = function(sequelize, DataTypes) {
    var Roles = sequelize.define("roles", {
        // Giving the Roles model a title of type STRING, a low and high salary of type integer
        r_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        salary_low: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        salary_high: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        }
    });

    Roles.associate = function(models) {
        // Associating Roles with Employees and Job_skills

        Roles.hasMany(models.Job_skills, {
            //onDelete: "cascade"
        });
        Roles.hasMany(models.Employees, {

        });
    };

    return Roles;
};