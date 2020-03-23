'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('implementor', {
    implementorName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    profitMotive: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'implementor'
  });
};
