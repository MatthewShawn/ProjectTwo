module.exports = function(sequelize, DataTypes) {
    var Job_skills = sequelize.define("Job_skills", {
        freezeTableName: true,
        min_level_required: {
            type: DataTypes.INTEGER,
            allowNull: true,
            len: [1]
        }
    });

    Job_skills.associate = function(models) {
        // We're saying that a Job_skills should belong to an Roles and Skill_data
        // A Job_Skill must belong to a Role (and can exist for other Roles), and it must have a Skill_data
        // that can exist for other Job_skills or other Emp_skills
        Employees.belongsTo(models.Roles, {
            foreignKey: "id",
            as: "job_role",
            allowNull: false
        });

        Job_skills.belongsTo(models.Roles, {
            foreignKey: "id",
            as: "the_skill",
            allowNull: false
        });

        Job_skills.belongsTo(models.Skill_data, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Job_skills;
};
