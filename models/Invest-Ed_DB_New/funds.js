'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funds', {
    tagNum: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    funderName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'funder',
        key: 'funderName'
      }
    },
    startYear: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endYear: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'funds'
  });
};
