'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fundereducationsubsectors', {
    funderName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    educationSubsector: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'fundereducationsubsectors'
  });
};
