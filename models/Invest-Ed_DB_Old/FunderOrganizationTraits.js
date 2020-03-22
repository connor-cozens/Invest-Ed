'use strict'

const Sequelize = require("sequelize")
//const db = require("../../database/invest-ed_db")

module.exports = (sequelize, DataTypes) => {
    const FunderOrganizationTraits = sequelize.define('FunderOrganizationTraits',
    {
        funderName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        trait: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return FunderOrganizationTraits
}