'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const FunderEducationSubsector = sequelize.define('FunderEducationSubsector',
    {
        funderName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        educationSubsector: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return FunderEducationSubsector
}