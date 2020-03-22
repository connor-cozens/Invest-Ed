'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programmingactivity', {
    programmingActivity: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    programTheme: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'programmingactivity'
  });
};
