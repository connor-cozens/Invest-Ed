'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativelaunchcountry', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    launchCountry: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'country',
        key: 'countryName'
      }
    }
  }, {
    tableName: 'initiativelaunchcountry'
  });
};
