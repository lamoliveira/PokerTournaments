module.exports = function (sequelize, DataTypes) {
  var Deck = sequelize.define("Deck", {
    // Giving the Deck model a name of type STRING
    name: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Deck.associate = function (models) {
    // Associating Deck with Tournaments
    // When an Deck is deleted, also delete any associated Tournaments
    Deck.hasMany(models.Tournament, {
    });
    Deck.belongsToMany(models.Chip, {through: 'DeckChip'});
  }
  return Deck;
};