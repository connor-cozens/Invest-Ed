'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const FunderInternationalBase = sequelize.define('FunderInternationalBase',
    {
        funderName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        baseLocation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return FunderInternationalBase

}