'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeMainEducationSubsector = sequelize.define('InitiativeMainEducationSubsector',
    {
        initiativeTagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        educationSubsector: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })
    return InitiativeMainEducationSubsector
}