module.exports = function (sequelize, DataTypes) {
  var Tournament = sequelize.define("Tournament", {
    tournamentname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
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
    },
    buyin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },   
    
    buyinstakes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    rebuy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  
    rebuystakes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addon: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addonstakes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
);

  Tournament.associate = function (models) {
    // We're saying that a Tournament should belong to an league
    // A tounment can't be created without an league due to the foreign key constraint
    Tournament.belongsTo(models.League, {
      foreignKey: {
        allowNull: false
      }
    });
    Tournament.belongsToMany(models.User, { through: models.Player }); 
  };
  return Tournament;
};