'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeRegion = sequelize.define('InitiativeRegion',
    {
        tagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        region: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })

    return InitiativeRegion
    
}