'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const FunderOperation = sequelize.define('FunderOperation',
    {
        funderName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        operation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return FunderOperation
}