const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        organization: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        accessLevel: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        created: {
            type: Sequelize.DATE
        }
    },
    {
        tableName: 'users',  //Specify table name to connect to in db
        timestamps: false
    }

)
