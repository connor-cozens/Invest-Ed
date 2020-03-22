'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativecountryofoperation', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    country: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'country',
        key: 'countryName'
      }
    }
  }, {
    tableName: 'initiativecountryofoperation'
  });
};
