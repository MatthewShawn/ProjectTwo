module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define(
        "Role", {
            // Giving the Roles model a title of type STRING, a low and high salary of type integer
            r_title: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            salary_low: {
                type: DataTypes.FLOAT,
                allowNull: false,
                isFloat: true
            },
            salary_high: {
                type: DataTypes.FLOAT,
                allowNull: false,
                isFloat: true
            }
        }, {
            freezeTableName: true,
            underscored: true
        }
    );

    Role.associate = function(models) {
        // Associating Roles with Employees and Job_skills

        Role.hasMany(models.Job_skills, {
            //onDelete: "cascade"
        });
        Role.hasMany(models.Employees, {});
    };

    return Role;
};