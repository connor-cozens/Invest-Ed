'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
        const Regions = sequelize.define('Regions',
    {
        regionName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        includedCountry: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })

    return Regions
}