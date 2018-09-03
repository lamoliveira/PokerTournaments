module.exports = function (sequelize, DataTypes) {
    var Chip = sequelize.define("Chip", {
      // Giving the Chip model a name of type STRING
      name: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Chip.associate = function (models) {
      // Associating Chip with Decks
      
      Chip.hasMany(models.Deck, {
      });
    }
    return Chip;
  };