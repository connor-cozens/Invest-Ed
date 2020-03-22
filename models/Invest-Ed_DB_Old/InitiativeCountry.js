'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeCountry = sequelize.define('InitiativeCountry',
    {
        tagNumber: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        tagNum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        startYear: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endYear: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    })

    return InitiativeCountry
}