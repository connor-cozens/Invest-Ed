'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countryworldbankcodes', {
    worldBankCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    worldBankGroup: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'countryworldbankcodes'
  });
};
