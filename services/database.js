'use strict';

const dbconfig = require('./../config/dbconfig');
const sequelize = require('sequelize');

module.exports = new sequelize(
    dbconfig.db.local.database,
    dbconfig.db.local.user,
    dbconfig.db.local.password,
    {
      host: dbconfig.db.local.host,
      dialect: dbconfig.db.local.dialect
    }
);
