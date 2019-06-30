module.exports = function(sequelize, DataTypes) {
    var Job_skills = sequelize.define(
        "Job_skills", {
            min_level_required: {
                type: DataTypes.INTEGER,
                allowNull: true,
                len: [1]
            }
        }, {
            freezeTableName: true,
            underscored: true
        }
    );

    Job_skills.associate = function(models) {
        // We're saying that a Job_skills should belong to an Roles and Skill_data
        // A Job_Skill must belong to a Role (and can exist for other Roles), and it must have a Skill_data
        // that can exist for other Job_skills or other Emp_skills
        Job_skills.belongsTo(models.Role, {
            foreignKey: "id",
            as: "role_id",
            allowNull: false
        });

        Job_skills.belongsTo(models.Skill_data, {
            foreignKey: "id",
            as: "the_skill",
            allowNull: false
        });
    };

    return Job_skills;
};