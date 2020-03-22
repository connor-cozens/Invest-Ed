'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const Countries = sequelize.define('Countries',
    {
        countryName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        countryCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        incomeGroup: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lendingGroup: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lendingCategory: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return Countries
}