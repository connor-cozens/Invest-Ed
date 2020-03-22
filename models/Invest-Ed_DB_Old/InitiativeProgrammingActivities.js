'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeProgrammingActivities = sequelize.define('InitiativeProgrammingActivities',
    {
        initiativeTagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        programmingActivity: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })
    
    return InitiativeProgrammingActivities
}