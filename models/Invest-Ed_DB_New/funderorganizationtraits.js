'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funderorganizationtraits', {
    funderName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    trait: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'funderorganizationtraits'
  });
};
