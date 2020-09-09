const Sequelize = require("sequelize")
const db = {}
const { db_username, db_password, db_host, db_accounts} = require('../config')
//DB name: accounts
const sequelize = new Sequelize(db_accounts, db_username, db_password, {
    host: db_host,
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established to accounts database successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the accounts database:', err);
  });

module.exports = db
