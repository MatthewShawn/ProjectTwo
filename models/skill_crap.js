module.exports = function(sequelize, DataTypes) {
    var Skill_crap = sequelize.define(
        "Skill_crap", {
            // Giving the Author model a name of type STRING
            d_title: {
                type: DataTypes.STRING,
                unique: true
            },
            d_desc: DataTypes.TEXT
        }, {
            freezeTableName: true,
            underscored: true
        }
    );

    Skill_crap.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Skill_crap.hasMany(models.Job_skills, {
            //onDelete: "cascade"
        });
        Skill_crap.hasMany(models.Emp_skills, {
            onDelete: "cascade"
        });
    };

    return Skill_crap;
};