'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const InitiativeSourceOfFees= sequelize.define('InitiaitveSourceOfFees',
    {
        initiativeTagNumber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        sourceOfFees: {
            type: Sequelize.STRING,
            allowNull: false
        },
   
    })
    return InitiativeSourceOfFees
}