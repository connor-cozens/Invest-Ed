'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('regions', {
    regionName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    includedCountry: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'regions'
  });
};
