'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeTargetGeography = sequelize.define('InitiativeTargetGeography',
    {
        InitiativeTagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        targetGeography: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })
    
    return InitiativeTargetGeography
}