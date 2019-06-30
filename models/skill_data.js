module.exports = function(sequelize, DataTypes) {
    var Skill_data = sequelize.define("Skill_data", {
        freeseTableName: true,
        // Giving the Author model a name of type STRING
        d_title: DataTypes.STRING,
        d_desc: DataTypes.TEXT
    });

    Skill_data.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Skill_data.hasMany(models.Job_skills, {
            //onDelete: "cascade"
        });
        Skill_data.hasMany(models.Emp_skills, {

        });
    };

    return Skill_data;
};