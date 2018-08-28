module.exports = function(sequelize, DataTypes) {
  var Tournament = sequelize.define("Tournament", {
    tournamentname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    
    tournamentdate: {
        type: DataTypes.DATE,
        allowNull: false
      },
    tournamentrules: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Tournament.associate = function(models) {
    // We're saying that a Tournament should belong to an user
    // A tounment can't be created without an user due to the foreign key constraint
    Tournament.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Tournament;
};
