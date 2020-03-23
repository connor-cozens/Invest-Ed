'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiative', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    initiativeName: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    initiativeWebsite: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    targetsWomen: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    startYear: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endYear: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mainProgrammingArea: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'programarea',
        key: 'programArea'
      }
    },
    mainProgrammingActivity: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'programmingactivity',
        key: 'programmingActivity'
      }
    },
    feeToAccess: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'initiative'
  });
};
