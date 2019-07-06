module.exports = function(sequelize, DataTypes) {
    var Emp_skills = sequelize.define(
        "Emp_skills", {
            current_level: {
                type: DataTypes.INTEGER,
                allowNull: true,
                len: [1]
            }
        }, {
            freezeTableName: true,
            underscored: true
        }
    );

    Emp_skills.associate = function(models) {
        // We're saying that an Employee skill belongs to an Employee at a specific
        // level, and that it must have a skill data defined that can exist for other
        // Emp_skills and Job_skills

        Emp_skills.belongsTo(models.Employees, {
            foreignKey: "id",
            as: "employees_id",
            allowNull: false
        });
        Emp_skills.belongsTo(models.Skill_crap, {
            foreignKey: "id",
            as: "skill_crap_id",
            allowNull: false
        });
    };

    return Emp_skills;
};