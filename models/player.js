module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    // Giving the Player model a name of type STRING
    name: DataTypes.STRING
  });

  return Player;
};
