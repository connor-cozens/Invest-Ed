'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const Implementor = sequelize.define('Implementor',
    {
        implementorName: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        profitMotive: {
            type: Sequelize.STRING,
            allowNull: false
        },

    })

    return Implementor
}