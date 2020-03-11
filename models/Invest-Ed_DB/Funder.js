'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const Funder = sequelize.define('Funder',
    {
        funderName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        website: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        profitMotive: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        impactInvesting: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        organizationalForm: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return Funder
}