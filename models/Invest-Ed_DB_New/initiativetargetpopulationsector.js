'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativetargetpopulationsector', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    targetPopulationSector: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'initiativetargetpopulationsector'
  });
};
