'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeTargetSchoolManagement = sequelize.define('InitiativeTargetSchoolManagement',
    {
        initiativeTagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        targetSchoolManagementType: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })
    
   return InitiativeTargetSchoolManagement
}