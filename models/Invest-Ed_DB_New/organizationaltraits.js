'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('organizationaltraits', {
    organizationalTrait: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'organizationaltraits'
  });
};
