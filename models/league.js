module.exports = function (sequelize, DataTypes) {
  var League = sequelize.define("League", {
    // Giving the League model a name of type STRING
    name: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  League.associate = function (models) {
    // Associating League with Tournaments
    // When an League is deleted, also delete any associated Tournaments
    League.hasMany(models.Tournament, {   });
    League.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return League;
};