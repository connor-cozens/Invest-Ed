'use strict'

const Sequelize = require("sequelize")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiative_view', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false
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
      allowNull: true
    },
    mainProgrammingActivity: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    feeToAccess: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    educationSubsector: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    sourceOfFunding: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    launchCountry: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    mainEducationSubsector: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    monitoredOutcome: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    programmingActivity: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    targetGeography: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    targetPopulationSector: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    targetSchoolManagementType: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'initiative_view'
  });
};
