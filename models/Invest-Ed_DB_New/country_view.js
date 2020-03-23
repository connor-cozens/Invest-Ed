'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country_view', {
    countryName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    incomeGroup: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lendingGroup: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    lendingCategory: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    worldBankCode: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    tableName: 'country_view'
  });
};
