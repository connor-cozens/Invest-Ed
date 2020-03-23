'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativeregion', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    region: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'regions',
        key: 'regionName'
      }
    }
  }, {
    tableName: 'initiativeregion'
  });
};
