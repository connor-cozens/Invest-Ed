'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const Initiative = sequelize.define('Initiative',
    {
        tagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        website: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        targetWomen: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        startYear: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endYear: {
            type: Sequelize.DATE,
            allowNull: false
        },
        launchCountry: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.STRING
        },
        mainProgrammingArea:{
            type: Sequelize.STRING,
            allowNull: false
        },
        mainProgrammingActivity:{
            type: Sequelize.STRING,
            allowNull: false
        },
        feeToAccess: {
            type: Sequelize.TINYINT,
            allowNull: false
        },
        targetPopulationSector:{
            type: Sequelize.STRING
        },
        outcomesMonitored: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return Initiative
}