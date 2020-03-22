'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countryworldbankgroups', {
    countryName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'country',
        key: 'countryName'
      }
    },
    worldBankGroups: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'countryworldbankgroups'
  });
};
